import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"; // Icons for wishlist, cart, and menu


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <h1>ShopSphere</h1>
      </div>

      {/* Desktop Navigation Links */}
      <ul className={`nav-links ${isMobileMenuOpen ? "mobile-menu" : ""}`}>
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

      {/* Icons for Wishlist and Cart */}
      <ul className="nav-icons">
        <li>
          <a href="/wishlist"> <FaHeart className="icon" title="Wishlist" /> </a>
        </li>
        <li>
          <a href="/cart"> <FaShoppingCart className="icon" title="Cart" /> </a>
        </li>
      </ul>

      {/* Mobile Hamburger Menu Icon */}
      <div className="hamburger-menu" 
        onClick={toggleMobileMenu} 
        aria-label="Toggle navigation menu" 
        aria-expanded={isMobileMenuOpen} 
        role="button" >
      {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </nav>
  );
};

export default Navbar;
