import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Banner from "../components/banner";
import axios from "axios";
import cartImage from "../assets/cart.png";

const Cart = ({ onProceedToCheckout }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = "https://shop-sphere-backend-sigma.vercel.app";

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cart/get-cart-items`);
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to load cart items. Please try again later.");
      }
    };

    fetchCartItems();
  }, []);

  // Toggle item selection
  const toggleItemSelection = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i._id !== item._id)
        : [...prevSelected, item]
    );
  };

  const calculateTotal = () => {
    return selectedItems
      .reduce((total, item) => total + (parseFloat(item.price || 0) * item.quantity), 0)
      .toFixed(2);
  };

  const increaseQuantity = async (id) => {
    try {
      await axios.put(`${apiUrl}/api/cart/update-quantity`, { id, change: 1 });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.error("Error increasing item quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const item = cartItems.find((item) => item._id === id);
      if (item.quantity > 1) {
        await axios.put(`${apiUrl}/api/cart/update-quantity`, { id, change: -1 });
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      } else {
        alert("Quantity cannot be less than 1.");
      }
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/cart/remove/${id}`);
      console.log("Item removed:", response.data);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/checkout`, {
        items: selectedItems,
      });
      console.log("Checkout successful:", response.data);
      setSelectedItems([]);
      onProceedToCheckout(selectedItems);
    } catch (err) {
      console.error("Error during checkout:", err);
      setError("Checkout failed. Please try again.");
    }
  };

  return (
    <div>
      <Banner />
      <Navbar />
      <div className="cart-container">
        <h2>Your ShopSphere Cart</h2>
        {error && <p className="error-message">{error}</p>}
        {cartItems.length === 0 ? (
          <div className="empty">
            <p>
              Uh-oh, your cart looks a bit lonely! Time to fill it with goodies!
            </p>
            <a className="call-to-action" href="/store">
              Continue Shopping
            </a>
            <img className="cart-wish" src={cartImage} alt="cart-image" />
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.title} className="item-image" />
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleItemSelection(item)}
                  />
                  <span>{item.title}</span>
                  <span>
                    ${parseFloat(item.price || 0).toFixed(2)} x {item.quantity}
                  </span>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)}>+</button>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
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