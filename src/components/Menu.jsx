import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// Initialize Socket
const socket = io("http://localhost:5000");

const Menu = () => {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get("table"); // e.g. ?table=5
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Listen for Real-time Payment Confirmation
  useEffect(() => {
    socket.on("payment_success", (data) => {
      if (data.table === tableNumber) {
        alert("Payment Received! Order sent to Kitchen.");
        setCart([]); // Clear cart
      }
    });

    return () => socket.off("payment_success");
  }, [tableNumber]);

  // Dummy Data (Replace with API fetch)
  const products = [
    { id: 1, name: "Chicken Burger", price: 500 },
    { id: 2, name: "Fries", price: 200 },
    { id: 3, name: "Soda", price: 100 },
  ];

  const addToCart = (product) => {
    setCart([...cart, { ...product, qty: 1 }]);
  };

  const handlePayment = async () => {
    if (!phone) return alert("Enter M-Pesa number");
    setLoading(true);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      await axios.post("http://localhost:5000/api/mpesa/pay", {
        phoneNumber: phone, // Format: 2547XXXXXXXX
        amount: total,
        tableNumber: tableNumber,
        items: cart,
      });
      alert("Check your phone for the PIN prompt!");
    } catch (err) {
      console.error(err);
      alert("Payment Request Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!tableNumber)
    return <div className="p-10 text-red-500">Error: Scan a valid QR Code</div>;

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Table {tableNumber} Menu</h1>

      {/* Menu Items */}
      <div className="space-y-4 mb-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between bg-white p-4 rounded shadow"
          >
            <div>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-gray-500">KES {p.price}</p>
            </div>
            <button
              onClick={() => addToCart(p)}
              className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart / Checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
          <h3 className="font-bold text-lg mb-2">
            Total: KES {cart.reduce((a, b) => a + b.price, 0)}
          </h3>

          <input
            type="text"
            placeholder="2547..."
            className="w-full border p-2 mb-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded font-bold disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Pay with M-Pesa"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
