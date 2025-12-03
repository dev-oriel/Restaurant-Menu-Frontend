import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link
              to="/"
              className="text-base text-gray-300 hover:text-orange-500"
            >
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <a
              href="#about"
              className="text-base text-gray-300 hover:text-orange-500"
            >
              About Us
            </a>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/menu"
              className="text-base text-gray-300 hover:text-orange-500"
            >
              Menu
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/login"
              className="text-base text-gray-300 hover:text-orange-500"
            >
              Staff Access
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {/* Social Media Links Placeholder */}
          <a href="#" className="text-gray-400 hover:text-orange-500">
            {/* Facebook Icon */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.564V12h3.298l-.51 3.593h-2.788v6.987A10.01 10.01 0 0022 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-500">
            {/* Instagram Icon */}
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.723.01 3.682.043 4.19.147 6.027 1.258 7.185 2.417 1.157 1.158 2.268 3.004 2.417 7.185.033.959.043 1.252.043 3.682v3.315c0 2.43-.01 2.723-.043 3.682-.147 4.19-1.258 6.027-2.417 7.185-1.158 1.157-3.004 2.268-7.185 2.417-.959.033-1.252.043-3.682.043h-3.315c-2.43 0-2.723-.01-3.682-.043-4.19-.147-6.027-1.258-7.185-2.417C2.43 20.356 1.319 18.51.987 14.329c-.033-.959-.043-1.252-.043-3.682v-3.315c0-2.43.01-2.723.043-3.682C1.137 3.016 2.248 1.17 3.406.012 4.564-1.147 6.41-2.258 10.59-2.405c.959-.033 1.252-.043 3.682-.043zm-1.84 10.999a4 4 0 11-8 0 4 4 0 018 0zm6.83-7.5c0-.987-.803-1.79-1.79-1.79s-1.79.803-1.79 1.79.803 1.79 1.79 1.79 1.79-.803 1.79-1.79z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} FLEVANEST EATERIES. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
