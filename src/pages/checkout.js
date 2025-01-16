import React, { useState } from 'react';

const Checkout = ({ selectedItems, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [error, setError] = useState('');

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simple validation to check if all fields are filled out
  const validateForm = () => {
    const { address, cardNumber, expiry, cvv } = formData;
    if (!address || !cardNumber || !expiry || !cvv) {
      return 'All fields are required.';
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      return 'Card number must be 16 digits.';
    }
    if (!/\d{2}\/\d{2}/.test(expiry)) {
      return 'Expiry date should be in MM/YY format.';
    }
    if (!/^\d{3}$/.test(cvv)) {
      return 'CVV must be 3 digits.';
    }
    return '';
  };

  const handlePayment = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Payment simulation
    alert('Payment Successful!');
    onPaymentSuccess(); // Call the callback to handle success (e.g., redirect or reset)
  };

  const calculateTotal = () => {
    return selectedItems
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Display error message if validation fails */}
      {error && <div className="error-message">{error}</div>}

      <div className="checkout-items">
        <h3>Items to Purchase</h3>
        {selectedItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>{item.title}</span>
            <span>${parseFloat(item.price).toFixed(2)}</span> {/* Assuming 'title' is correct */}
          </div>
        ))}
      </div>

      <div className="checkout-form">
        <h3>Total: ${calculateTotal()}</h3>
        <form>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              required
              placeholder="MM/YY"
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="button" onClick={handlePayment}>
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;