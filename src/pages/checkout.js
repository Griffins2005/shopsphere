import React, { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QpXGwDWc7o7twNLmONlHvrxVrQzLb9Ebmyp09rxX9CcRLwpPfo8HH5LqOnUunF5SlBY2aht0SbvgLQ72NueFxFU00JPDTLzIF");

const CheckoutForm = ({ selectedItems, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({ address: "" });
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3";
    script.async = true;
    document.body.appendChild(script);
  },[]);


  const handleInputChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
    setError("");
  };

  const totalAmount = useMemo(() => {
    return selectedItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  }, [selectedItems]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
  
    if (!stripe || !elements) return;
  
    const cardElement = elements.getElement(CardElement);
  
    try {
      const response = await fetch("https://shopsphere-backend-app.vercel.app/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount, currency: "usd" }),
      });
  
      const { clientSecret } = await response.json();
  
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { address: { line1: formData.address } },
        },
      });
  
      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        onPaymentSuccess();
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handlePayment} className="checkout-form">
      <h3>Total: ${totalAmount}</h3>
      {error && <div className="error-message">{error}</div>}
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
      </label>
      <label>
        Card Details:
        <CardElement className="card-input" />
      </label>
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </form>
  );
};

const Checkout = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default Checkout;