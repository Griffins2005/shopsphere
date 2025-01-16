import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Footer from '../components/footer';
import axios from 'axios'; 

const Wishlist = ({ wishlistItems, onAddToCart }) => {
  const [wishlist, setWishlist] = useState([]);
  const apiUrl = "https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev";

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-wishlist`); 
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlist();
  }, []); // Empty array ensures this runs only once on component mount

  // Handle adding item to cart
  const handleAddToCart = async (item) => {
    try {
      // Send POST request to add the item to the cart
      await axios.post(`${apiUrl}/add-to-cart`, item);

      // Call the onAddToCart function passed down from the parent component (for local state update)
      onAddToCart(item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <Banner />
      <Navbar />
      <div className="wishlist-container">
        <h2>Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-items">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="wishlist-item-details">
                  <span className="item-title">{item.title}</span>
                  <span className="item-price">
                    ${parseFloat(item.price).toFixed(2)}
                  </span>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
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