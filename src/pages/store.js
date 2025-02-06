import React, { useState } from "react";
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Footer from '../components/footer';
import productsData from "../context/products"; 
import { FaHeart, FaCheck } from "react-icons/fa";
import axios from 'axios';

const Store = ({ cart, wishlist, addToCart, addToWishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState("Furniture");
  const [searchTerm, setSearchTerm] = useState("");
  const [showTick, setShowTick] = useState({ id: null, type: null });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

const handleAddToCart = async (item) => {
  try {
    const itemExistsInCart = cart.some((cartItem) => cartItem.title === item.title);
    if (itemExistsInCart) {
      alert("This item is already in your cart.");
      return;
    }
    await axios.post(`https://shop-sphere-backend-sigma.vercel.app/api/cart/add-to-cart`, item);
    addToCart(item);
    setShowTick({ id: item.title, type: "cart" });
    clearTick();
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

const handleAddToWishlist = async (item) => {
  try {
    const itemExistsInWishlist = wishlist.some((wishlistItem) => wishlistItem.title === item.title);
    if (itemExistsInWishlist) {
      alert("This item is already in your wishlist.");
      return;
    }
    await axios.post(`https://shop-sphere-backend-sigma.vercel.app/api/wishlist/add-to-wishlist`, item);
    addToWishlist(item);
    setShowTick({ id: item.title, type: "wishlist" });
    clearTick();
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
  }
};

  const clearTick = () => {
    setTimeout(() => setShowTick({ id: null, type: null }), 2000);
  };

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