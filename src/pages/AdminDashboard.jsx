import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { QRCodeCanvas } from "qrcode.react"; // FIX: Use named import

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, you would include the token here:
        // headers: { Authorization: `Bearer ${user.token}` }
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders`
        );
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("new_order_paid", (order) => {
        setOrders((prev) => [order, ...prev]);
        alert(`New Order Paid: Table ${order.tableNumber}`);
      });
    }
  }, [socket]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Kitchen Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map((order) => (
          <div
            key={order._id}
            className={`p-4 border rounded shadow ${
              order.paymentStatus === "PAID" ? "bg-white" : "bg-gray-100"
            }`}
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold text-lg">
                Table {order.tableNumber}
              </span>
              <span
                className={`px-2 rounded text-white text-sm ${
                  order.paymentStatus === "PAID"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
            <ul className="mt-2">
              {order.orderItems.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b py-1">
                  <span>
                    {item.name} x{item.qty}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 font-bold text-right">
              Total: KES {order.totalPrice}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-5">
        <h2 className="text-xl font-bold">QR Code Generator</h2>
        <div className="flex gap-4 mt-4">
          <div className="text-center">
            {/* FIX: Use QRCodeCanvas instead of QRCode */}
            <QRCodeCanvas
              value="http://localhost:5173/menu?table=1"
              size={128}
            />
            <p>Table 1</p>
          </div>
          <div className="text-center">
            {/* FIX: Use QRCodeCanvas instead of QRCode */}
            <QRCodeCanvas
              value="http://localhost:5173/menu?table=2"
              size={128}
            />
            <p>Table 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
