import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-orange-500">
        M-Pesa Restaurant
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/menu" className="hover:text-gray-300">
          Menu
        </Link>
        <Link to="/checkout" className="hover:text-gray-300">
          Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
        </Link>

        {user ? (
          <>
            <Link to="/admin" className="text-yellow-400 font-bold">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-300">
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
