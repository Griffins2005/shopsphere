import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Footer from '../components/footer';
import axios from 'axios';
import wishImage from "../assets/wish-image.png";

const Wishlist = ({ onAddToCart }) => {
  const [wishlist, setWishlist] = useState([]);
  const apiUrl = "http://localhost:5001";

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/wishlist/get-wishlist`);
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlist();
  }, []);

  // Handle removing item from wishlist
  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/wishlist/remove/${id}`);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  // Handle adding item to cart
  const handleAddToCart = async (item) => {
    try {
      await axios.post(`${apiUrl}/api/cart/add-to-cart`, item);
      onAddToCart(item);
      // Optionally, remove from wishlist after adding to cart
      handleRemoveFromWishlist(item._id);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <Banner />
      <Navbar />
      <div className="wishlist-container">
        <h2>Your ShopSphere Wishlist</h2>
        {wishlist.length === 0 ? (
          <div className='empty'>
            <p>Your wishlist is feeling a bit empty!  Let's add some magic to it!</p>
            <a className="call-to-action" href="/store">Browse Products</a>
            <img className='cart-wish' src={wishImage} alt='wishlist bubble' />
          </div>
        ) : (
          <div className="wishlist-items">
            {wishlist.map((item) => (
              <div key={item._id} className="wishlist-item">
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="wishlist-item-details">
                  <span className="item-title">{item.title}</span>
                  <span className="item-price">${parseFloat(item.price).toFixed(2)}</span>
                  <button className="add-to-cart" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                  <button className="remove-item" onClick={() => handleRemoveFromWishlist(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;