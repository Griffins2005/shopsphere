import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Footer from '../components/footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shopsphere-backend-app.vercel.app/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message.');
    }
  };

  return (
    <div>
      <Banner />
      <Navbar />
    <div className="contact-container">
      <div className="form-section">
        <h2>Contact us</h2>
        <p>Have a question or need assistance? Feel free to reach out to our friendly customer support team!</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email address *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message *
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-button">Submit form</button>
        </form>
      </div>
      <div className="map-section">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/place/Times+Square,+New+York,+NY+10036/@40.7580053,-73.9881437,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25855a96da09d:0x860bf5a5e1a00a68!8m2!3d40.7579747!4d-73.9855426!16s%2Fg%2F11bw3fky91?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ContactUs;
