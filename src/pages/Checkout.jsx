import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";

const Checkout = () => {
  const { cartItems, tableNumber, clearCart } = useContext(CartContext);
  const socket = useContext(SocketContext);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [status, setStatus] = useState("IDLE"); // IDLE, PROCESSING, PAID, FAILED

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  useEffect(() => {
    if (socket && orderId) {
      socket.emit("join_order", orderId);

      socket.on("payment_status", (data) => {
        console.log("Payment Update:", data);
        if (data.status === "PAID") {
          setStatus("PAID");
          clearCart();
        } else if (data.status === "FAILED") {
          setStatus("FAILED");
          setLoading(false);
        }
      });

      return () => socket.off("payment_status");
    }
  }, [socket, orderId]);

  const handlePayment = async () => {
    if (!phone || cartItems.length === 0) return;
    setLoading(true);
    setStatus("PROCESSING");

    try {
      // 1. Create Order in DB
      const orderPayload = {
        tableNumber: tableNumber || "1",
        customerPhone: phone,
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          qty: item.qty,
          price: item.price,
        })),
        totalPrice: total,
      };

      const { data: order } = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderPayload
      );
      setOrderId(order._id);

      // 2. Initiate STK Push
      await axios.post(`${import.meta.env.VITE_API_URL}/mpesa/stkpush`, {
        phone: phone,
        amount: total,
        orderId: order._id,
      });

      // Now we wait for socket update...
    } catch (error) {
      console.error(error);
      setStatus("FAILED");
      setLoading(false);
    }
  };

  if (status === "PAID") {
    return (
      <div className="p-10 text-center">
        <h2 className="text-3xl text-green-600 font-bold">
          Payment Successful!
        </h2>
        <p className="mt-4">Your order is being prepared.</p>
        <a
          href={`${import.meta.env.VITE_API_URL}/orders/${orderId}/receipt`}
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded"
          target="_blank"
        >
          Download Receipt
        </a>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout (Table {tableNumber})</h2>

      <div className="mb-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between py-2 border-b">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>KES {item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between py-2 font-bold text-lg">
          <span>Total</span>
          <span>KES {total}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">
          M-Pesa Phone Number
        </label>
        <input
          type="text"
          placeholder="0712345678"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />
      </div>

      {status === "PROCESSING" && (
        <div className="bg-yellow-100 text-yellow-800 p-3 mb-4 rounded">
          Check your phone for the M-Pesa prompt...
        </div>
      )}

      {status === "FAILED" && (
        <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">
          Payment failed or cancelled. Try again.
        </div>
      )}

      <button
        className={`w-full p-3 rounded text-white font-bold ${
          loading ? "bg-gray-400" : "bg-green-600"
        }`}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "PAY WITH M-PESA"}
      </button>
    </div>
  );
};

export default Checkout;
