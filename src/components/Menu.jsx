// frontend/src/components/Menu.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import clsx from "clsx";

/**
 * ENV:
 * REACT_APP_API_BASE -> e.g. http://localhost:5000
 *
 * Notes:
 * - Ensure TailwindCSS is installed and configured.
 * - Install clsx for conditional classes: `npm i clsx`
 */

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
const SOCKET_PATH = `${API_BASE.replace(/^http/, "ws")}`;

// Simple phone validator for Kenyan numbers.
// Accepts: 07xxxxxxxx, 2547xxxxxxxx, +2547xxxxxxxx
const isKenyanPhone = (p) => {
  if (!p) return false;
  const cleaned = p.replace(/\s|\-/g, "");
  return /^(?:\+254|254|0)?7\d{8}$/.test(cleaned);
};

// format KES nicely
const formatKES = (n) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(
    n
  );

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [cart, setCart] = useState([]); // { _id, name, price, quantity, image, category }
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("browsing"); // browsing, processing, paid, failed
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState(null); // inline status messages

  // Table from URL (default 1)
  const queryParams = new URLSearchParams(window.location.search);
  const table = queryParams.get("table") || "1";

  // Socket: create once and clean up
  useEffect(() => {
    const socket = io(API_BASE, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect_error", (err) => {
      console.warn("Socket connect error:", err?.message || err);
    });

    socket.on("order_update", (data) => {
      // Expecting { type: "PAYMENT_SUCCESS"|"PAYMENT_FAILED", orderId }
      if (data?.orderId && data.orderId === orderId) {
        if (data.type === "PAYMENT_SUCCESS") {
          setStatus("paid");
          setMessage("Payment confirmed — preparing your order.");
        } else if (data.type === "PAYMENT_FAILED") {
          setStatus("failed");
          setMessage("Payment failed. Please try again.");
        }
      }
    });

    return () => {
      socket.off("order_update");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]); // keep orderId in deps so correct order updates match

  // Fetch menu
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFetchError(null);

    axios
      .get(`${API_BASE}/api/menu`)
      .then((res) => {
        if (cancelled) return;
        setMenu(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Menu Fetch Error:", err);
        if (!cancelled) setFetchError("Failed to load menu. Try again later.");
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  // Derived totals
  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const vat = Math.round(subtotal * 0.16); // example 16% VAT; change as needed
    const total = subtotal + vat;
    return { subtotal, vat, total };
  }, [cart]);

  // Cart helpers
  const addToCart = useCallback(
    (item) => {
      setCart((prev) => {
        const idx = prev.findIndex((p) => p._id === item._id);
        if (idx === -1) {
          return [...prev, { ...item, quantity: 1 }];
        }
        // increment existing
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      });
      setMessage(null);
    },
    [setCart]
  );

  const updateQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((it) =>
          it._id === id ? { ...it, quantity: Math.max(0, qty) } : it
        )
        .filter((it) => it.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((it) => it._id !== id));
  }, []);

  // Initiate payment (calls backend to send STK push)
  const handlePay = useCallback(async () => {
    if (!isKenyanPhone(phone)) {
      setMessage("Enter a valid Kenyan phone number (e.g., 2547XXXXXXXX).");
      return;
    }
    if (cart.length === 0) {
      setMessage("Your cart is empty. Add something delicious first.");
      return;
    }

    try {
      setStatus("processing");
      setMessage("Initiating payment... Check your phone for the STK prompt.");

      const payload = {
        tableNumber: table,
        items: cart.map((i) => ({
          id: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal: totals.subtotal,
        vat: totals.vat,
        totalAmount: totals.total,
        phoneNumber: phone.replace(/\s+/g, ""),
      };

      const res = await axios.post(`${API_BASE}/api/orders`, payload, {
        timeout: 10000,
      });

      const { orderId: newOrderId } = res.data || {};
      setOrderId(newOrderId || null);

      setMessage("STK push sent. Confirm on your phone.");
      // Keep status as 'processing' until socket tells us it's paid/failed
    } catch (err) {
      console.error(
        "Payment init error:",
        err?.response || err?.message || err
      );
      setStatus("browsing");
      setMessage("Failed to initiate payment. Try again.");
    }
  }, [phone, cart, table, totals]);

  // Small UI: skeleton while loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/5"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🍽️</div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">
                Restaurant Menu
              </h1>
              <p className="text-xs text-gray-500">Scan, order, pay — easy.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
              Table {table}
            </span>
            <button
              className="text-sm px-3 py-2 rounded-md border hover:bg-gray-100"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Top
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 grid gap-6">
        {/* Inline message */}
        {message && (
          <div
            className={clsx(
              "rounded-md p-3 text-sm",
              status === "processing"
                ? "bg-yellow-50 text-yellow-800"
                : status === "paid"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            )}
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        {/* Menu grid */}
        <section className="grid gap-4 md:grid-cols-2">
          {menu.length === 0 && (
            <div className="p-6 bg-white rounded-lg shadow text-center text-gray-500">
              No menu items available.
            </div>
          )}

          {menu.map((item) => (
            <article
              key={item._id}
              className="flex items-stretch gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    🍲
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-orange-600 font-bold">
                      {formatKES(item.price)}
                    </div>
                    <div className="text-xs mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                        {item.category || "General"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 transition text-sm border"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Add
                    </button>
                  </div>

                  <div className="text-xs text-gray-400">Ready in ~10-20m</div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Cart / Checkout card */}
        <aside className="sticky bottom-6 self-start">
          <div className="bg-white p-4 rounded-xl shadow-lg w-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Your Order</h2>
              <span className="text-sm text-gray-500">
                {cart.length} item(s)
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="text-sm text-gray-500">
                Cart is empty — add items above.
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((it) => (
                  <div key={it._id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{it.name}</div>
                      <div className="text-xs text-gray-500">
                        {formatKES(it.price)} each
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(it._id, it.quantity - 1)}
                        aria-label={`Decrease ${it.name}`}
                        className="w-8 h-8 rounded-md border flex items-center justify-center"
                      >
                        −
                      </button>
                      <div className="w-8 text-center">{it.quantity}</div>
                      <button
                        onClick={() => updateQty(it._id, it.quantity + 1)}
                        aria-label={`Increase ${it.name}`}
                        className="w-8 h-8 rounded-md border flex items-center justify-center"
                      >
                        +
                      </button>

                      <div className="w-24 text-right font-semibold">
                        {formatKES(it.price * it.quantity)}
                      </div>

                      <button
                        onClick={() => removeFromCart(it._id)}
                        aria-label={`Remove ${it.name}`}
                        className="ml-2 text-xs text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatKES(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>VAT (16%)</span>
                    <span>{formatKES(totals.vat)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span className="text-orange-600">
                      {formatKES(totals.total)}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    M-Pesa Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="2547XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="mt-3 grid gap-2">
                  <button
                    onClick={handlePay}
                    disabled={status === "processing"}
                    className={clsx(
                      "w-full py-3 rounded-lg text-white font-semibold transition",
                      status === "processing"
                        ? "bg-gray-400 cursor-wait"
                        : "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    {status === "processing"
                      ? "Processing — check phone"
                      : "Pay with M-Pesa"}
                  </button>

                  <button
                    onClick={() => {
                      // reset to start new order
                      setCart([]);
                      setPhone("");
                      setOrderId(null);
                      setStatus("browsing");
                      setMessage(null);
                    }}
                    className="w-full py-2 rounded-lg border text-sm"
                  >
                    Clear Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick receipt / success */}
          {status === "paid" && orderId && (
            <div className="mt-3 p-3 bg-green-50 rounded-md text-sm">
              <div className="font-semibold text-green-800">
                Payment Successful
              </div>
              <div className="text-gray-700 mt-1">
                We are preparing your order.{" "}
                <a
                  href={`${API_BASE}/api/orders/${orderId}/receipt`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-green-700"
                >
                  Download receipt
                </a>
              </div>
            </div>
          )}
        </aside>

        {/* Fetch error */}
        {fetchError && <div className="text-red-600 text-sm">{fetchError}</div>}
      </main>
    </div>
  );
}
