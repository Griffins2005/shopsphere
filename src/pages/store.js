import React, { useState } from "react";
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Footer from '../components/footer';
import productsData from "../context/products"; // Importing the products data
import { FaHeart, FaCheck } from "react-icons/fa";
import axios from 'axios'; // Importing axios for API requests

const Store = ({ cart, wishlist, addToCart, addToWishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState("Furniture");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTick, setShowTick] = useState({ id: null, type: null });

  // API URL (Change this to your backend API endpoint)
  const apiUrl = "https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev";

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Reset search when switching categories
  };

  // Handle adding to cart
  const handleAddToCart = async (item) => {
    try {
      // Send POST request to API to add item to cart
      await axios.post(`${apiUrl}/add-to-cart`, item);

      // Update local cart state and UI
      addToCart(item);
      setShowTick({ id: item.title, type: "cart" });
      clearTick();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Handle adding to wishlist
  const handleAddToWishlist = async (item) => {
    try {
      // Send POST request to API to add item to wishlist
      await axios.post(`${apiUrl}/add-to-wishlist`, item);

      // Update local wishlist state and UI
      addToWishlist(item);
      setShowTick({ id: item.title, type: "wishlist" });
      clearTick();
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  // Clear tick after a delay
  const clearTick = () => {
    setTimeout(() => setShowTick({ id: null, type: null }), 2000);
  };

  // Filter items based on selected category and search term
  const selectedItems = productsData
    .find((category) => category.category === selectedCategory)
    ?.items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="store-page">
      <Banner />
      <Navbar />
      <div className="store-intro">
        <h1>Store</h1>
        <p>
          Welcome to our Store page where you can explore a wide range of Home & Living Furniture, Home Decor, Kitchen Essentials, and Bedding. Discover high-quality products to enhance your home decor and lifestyle.
        </p>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mini-navbar */}
      <div className="mini-navbar">
        {productsData.map((category) => (
          <button
            key={category.category}
            className={`category-button ${
              selectedCategory === category.category ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category.category)}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Dropdown menu */}
      <div className="dropdown-menu">
        <select
          className="category-dropdown"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {productsData.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="items-container">
        {selectedItems?.map((item, index) => (
          <div key={index} className="item-card">
            <img src={item.image} alt={item.title} className="item-image" />
            <h3 className="item-title">{item.title}</h3>
            <p className="item-description">{item.description}</p>
            <p className="item-price">${item.price}</p>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
            <FaHeart
              className="wish-icon"
              title="Wishlist"
              onClick={() => handleAddToWishlist(item)}
            />
            {/* Tick Feedback */}
            {showTick?.id === item.title && showTick.type && (
              <FaCheck
                className={`tick-icon ${
                  showTick.type === "cart" ? "cart-tick" : "wishlist-tick"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Store;