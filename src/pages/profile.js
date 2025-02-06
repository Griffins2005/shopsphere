import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar"
import Banner from "../components/banner"
import Footer from "../components/footer"


const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shipping: {
      address: "",
      city: "",
      zipCode: "",
      country: "",
    },
    payment: {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://shop-sphere-backend-sigma.vercel.app/api/user/me", {
          withCredentials: true,
        });

        if (response.status === 200 && response.data) {
          setProfileData(response.data);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            shipping: response.data.shipping || {},
            payment: response.data.payment || {},
          });
        } else {
          setProfileData(null);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [section, field] = name.split("."); 
    if (section && field) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "https://shop-sphere-backend-sigma.vercel.app/api/user/me",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Profile updated successfully:", response.data);
      setProfileData(response.data);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Banner />
      <Navbar />
      <h1>User Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {profileData ? (
        <div>
          <h2>Profile Information</h2>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <h3>Shipping Info:</h3>
          <p>Address: {profileData.shipping?.address}</p>
          <p>City: {profileData.shipping?.city}</p>
          <p>Zip Code: {profileData.shipping?.zipCode}</p>
          <p>Country: {profileData.shipping?.country}</p>
          <h3>Payment Info:</h3>
          <p>Card Number: {profileData.payment?.cardNumber}</p>
          <p>Expiration Date: {profileData.payment?.expirationDate}</p>
          <p>CVV: {profileData.payment?.cvv}</p>
        </div>
      ) : (
        <div>
          <h2>Create or Update Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <h3>Shipping Info:</h3>
            <label>
              Address:
              <input
                type="text"
                name="shipping.address"
                value={formData.shipping.address}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              City:
              <input
                type="text"
                name="shipping.city"
                value={formData.shipping.city}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Zip Code:
              <input
                type="text"
                name="shipping.zipCode"
                value={formData.shipping.zipCode}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Country:
              <input
                type="text"
                name="shipping.country"
                value={formData.shipping.country}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <h3>Payment Info:</h3>
            <label>
              Card Number:
              <input
                type="text"
                name="payment.cardNumber"
                value={formData.payment.cardNumber}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Expiration Date:
              <input
                type="text"
                name="payment.expirationDate"
                value={formData.payment.expirationDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              CVV:
              <input
                type="text"
                name="payment.cvv"
                value={formData.payment.cvv}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;