import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);

  const playNotificationSound = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
    ); // Simple bell sound
    audio
      .play()
      .catch((e) => console.log("Audio play failed due to browser policy", e));
  };

  useEffect(() => {
    // 1. Initial Fetch (We will build this API endpoint next)
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/kitchen");
        setOrders(res.data);
      } catch (err) {
        console.error("Kitchen fetch error", err);
      }
    };
    fetchOrders();

    // 2. Listen for Real-time orders
    socket.on("payment_success", (newOrderData) => {
      // We usually get just ID/Table from socket, so we might need to fetch full details
      // or the socket sends the whole order object. Let's assume socket sends minimal data
      // and we re-fetch or add it. For now, let's assume we re-fetch for accuracy.
      playNotificationSound();
      fetchOrders();
    });

    return () => socket.off("payment_success");
  }, []);

  const markAsServed = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: "Served",
      });
      setOrders(orders.filter((o) => o._id !== orderId));
    } catch (err) {
      alert("Error updating order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-orange-500">
          🔥 Kitchen Display System (KDS)
        </h1>
        <div className="text-gray-400">
          Live Connection: <span className="text-green-500">● Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-600 text-xl">
            No active orders. Kitchen is clear!
          </div>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl"
          >
            {/* Card Header */}
            <div className="bg-orange-600 p-3 flex justify-between items-center">
              <span className="font-bold text-lg">
                Table {order.tableNumber}
              </span>
              <span className="text-xs bg-white text-orange-600 px-2 py-1 rounded font-mono">
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Order Items */}
            <div className="p-4 space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-700 pb-2 last:border-0"
                >
                  <span className="text-gray-200">{item.name}</span>
                  <span className="font-bold text-orange-400 text-lg">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Action */}
            <button
              onClick={() => markAsServed(order._id)}
              className="w-full bg-green-600 hover:bg-green-700 py-3 font-bold uppercase tracking-wider transition-colors"
            >
              Mark Served
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenDashboard;
