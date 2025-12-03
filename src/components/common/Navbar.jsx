import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Icon component (matching the design's unique SVG)
const CustomLogoIcon = () => (
  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
      fill="currentColor"
      fillRule="evenodd"
    ></path>
  </svg>
);

const Navbar = () => {
  const { user } = useContext(AuthContext); // Use user to conditionally show staff link/status

  const navLinks = [
    { name: "Home", path: "/", isExternal: false, isBold: false },
    { name: "About", path: "#story", isExternal: true, isBold: false },
    // For a static site, 'Our Menu' is the main link.
    { name: "Our Menu", path: "/menu", isExternal: false, isBold: true },
    { name: "Reservations", path: "#", isExternal: false, isBold: false }, // Placeholder
    {
      name: "Contact",
      path: "#footer-contact",
      isExternal: true,
      isBold: false,
    },
  ];

  const handleLinkClick = (e, path, isExternal) => {
    if (isExternal && path.startsWith("#")) {
      e.preventDefault();
      document
        .getElementById(path.substring(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Applied sticky, backdrop-blur, and border based on the new HTML
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-amber-600/20 dark:border-amber-600/30 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-4 sticky top-0 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm z-50">
      {/* Left Section: Logo and Brand Name */}
      <Link to="/" className="flex items-center gap-4">
        <div className="size-6 text-amber-600">
          <CustomLogoIcon />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-neutral-900 dark:text-neutral-50 font-display">
          FLEVANEST EATERIES
        </h2>
      </Link>

      {/* Center Section: Navigation Links (Hidden on small screens) */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-9">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={(e) => handleLinkClick(e, link.path, link.isExternal)}
            // Dynamic text styling based on original HTML emphasis
            className={`text-sm leading-normal transition-colors ${
              link.isBold
                ? "font-bold text-amber-600" // Our Menu link is bold and primary
                : "font-medium text-neutral-900/70 dark:text-neutral-50/70 hover:text-amber-600" // Standard links
            }`}
          >
            {link.name}
          </Link>
        ))}
        {/* Conditional Staff/Admin Login Link */}
        {!user && (
          <Link
            to="/login"
            className="text-sm font-medium leading-normal text-neutral-900/70 dark:text-neutral-50/70 hover:text-red-500 transition-colors"
          >
            Staff Login
          </Link>
        )}
      </nav>

      {/* Right Section: Button and Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        {/* Book a Table Button (or Conditional Dashboard for Admin) */}
        {user ? (
          <Link
            to="/admin"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-red-500 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate">Admin Dashboard</span>
          </Link>
        ) : (
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-amber-600 text-neutral-900 text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
            <span className="truncate">Book a Table</span>
          </button>
        )}

        {/* Mobile Menu Toggle (Placeholder) */}
        <button className="md:hidden p-2 rounded-lg hover:bg-amber-600/20">
          <span className="material-symbols-outlined text-neutral-900 dark:text-neutral-50">
            menu
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
