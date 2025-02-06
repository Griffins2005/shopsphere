import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

import Homepage from './pages/homePage';
import Store from './pages/store';
import Contact from './pages/contact';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Signup from './pages/signup';
import Profile from './pages/profile';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      if (!prevCart.some((cartItem) => cartItem.id === item.id)) {
        console.log("Adding to cart:", item);
        return [...prevCart, item];
      }
      return prevCart;
    });
  };

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
        console.log("Adding to wishlist:", item);
        return [...prevWishlist, item];
      }
      return prevWishlist;
    });
  };
  const handleProceedToCheckout = (selectedItems) => {
    console.log('Proceeding to checkout with selected items:', selectedItems);
  };
  console.log(cart);
  console.log(wishlist);

  return (
      <div className="App" >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store" element={<Store cart={cart} wishlist={wishlist} addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route path="/wishlist" element={<Wishlist wishlistItems={wishlist} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cart} onProceedToCheckout={handleProceedToCheckout} />} />
          <Route path="/checkout" element={<Checkout selectedItems={cart} onPaymentSuccess={() => alert('Payment successful!')} />} />
        </Routes>
      </div>
  );
}

export default App;