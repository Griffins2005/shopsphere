import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Banner from '../components/banner';
import axios from 'axios'; // Importing axios for API requests

const Cart = ({ onProceedToCheckout }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const apiUrl = "https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev"; 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/get-cart-items`); 
        setCartItems(response.data); 
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Empty array ensures this runs only once on component mount

  // Toggle item selection
  const toggleItemSelection = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  // Calculate the total price of selected items
  const calculateTotal = () => {
    return selectedItems
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      // Send the selected items for checkout
      const response = await axios.post(`${apiUrl}/checkout`, {
        items: selectedItems,
      });
      console.log("Checkout successful:", response.data);
      onProceedToCheckout(selectedItems); // Call the onProceedToCheckout function passed down from the parent component
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <Banner />
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleItemSelection(item)}
                  />
                  <span>{item.title}</span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Total: ${calculateTotal()}</h3>
              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className="checkout-button"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
