import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { SocketProvider } from "./context/SocketContext";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerMenu from "./components/Menu"; // Renamed the old Menu component to CustomerMenu for clarity

// Pages
import Home from "./pages/customer/Home"; // New Home Page
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import KitchenDashboard from "./pages/KitchenDashboard"; // Use the existing KitchenDashboard
import Login from "./pages/Login";

function App() {
  return (
    <SocketProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            {/* Navbar is outside the main content flow, but inside the Router */}
            <Navbar />
            <main className="min-h-[80vh]">
              {" "}
              {/* Added min-height for structure */}
              <Routes>
                {/* Public Informative Routes */}
                <Route path="/" element={<Home />} />

                {/* QR Code / Customer Ordering Routes */}
                {/* The main menu page the customer sees. It handles the QR code query param. */}
                <Route path="/menu" element={<CustomerMenu />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Staff Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/kitchen" element={<KitchenDashboard />} />
                </Route>
              </Routes>
            </main>
            <Footer /> {/* New Footer component */}
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </SocketProvider>
  );
}

export default App;
