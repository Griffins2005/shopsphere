import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo and Title */}
        <div className="logo">
          <h1>ShopSphere</h1>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/store">Store</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>

        {/* Icons for Wishlist, Cart, and Profile */}
        <ul className="nav-icons">
          <li>
            <a href="/wishlist">
              <FaHeart className="icon" title="Wishlist" />
            </a>
          </li>
          <li>
            <a href="/cart">
              <FaShoppingCart className="icon" title="Cart" />
            </a>
          </li>
          <li>
            <a href="/signup">
              <FaUser className="icon" title="Profile" />
            </a>
          </li>
        </ul>

        {/* Hamburger Menu Icon */}
        <div
          className="hamburger-menu"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          role="button"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/store">Store</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
