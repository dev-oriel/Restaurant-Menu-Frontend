import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on("order_update", (data) => {
      if (data.type === "PAYMENT_SUCCESS") {
        // Play Sound
        const audio = new Audio(
          "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        );
        audio.play().catch((e) => console.log("Autoplay prevented"));

        setOrders((prev) => [data, ...prev]);
      }
    });

    return () => socket.off("order_update");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-orange-500">
          👨‍🍳 Kitchen Display System
        </h1>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-400">Live Socket Connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl"
          >
            <div className="bg-orange-600 p-3 flex justify-between items-center">
              <span className="font-bold text-lg">Table {order.table}</span>
              <span className="text-xs bg-white text-orange-600 px-2 py-1 rounded font-mono">
                New
              </span>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {order.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b border-gray-700 pb-2 last:border-0"
                  >
                    <span>{item.name}</span>
                    <span className="font-bold text-orange-400">x1</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-600">
            Waiting for new orders...
          </div>
        )}
      </div>
    </div>
  );
}
