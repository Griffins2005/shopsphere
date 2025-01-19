import React from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner'
import Footer from '../components/footer';
import home from '../assets/home.png';

function Homepage() {
  return (
    <div className='homepage'>
      <Banner />
      <Navbar />
      <div className='hero'>
        <p>Elevate Your Home with Shopsphere's Stylish Collections!</p>
        {/* <button className='explore'>Explore Now</button> */}
      </div>
      <div>
        <h1>Welcome to Shopsphere - Your Destination for Home Essentials</h1>
        <p>At Shopsphere, we offer a curated selection of furniture, decor, and kitchen essentials to enhance your living space. Discover quality products that will transform your home into a haven of comfort and style.</p>
      </div>
      <div className='testimonials'>
        <blockquote>“I couldn't be happier with my purchase from Shopsphere! The quality of the products surpassed my expectations, and the delivery was seamless. Highly recommend!”</blockquote>
        <p className='author'>[John Doe]</p>
      </div>
      <div className='home-collections'>
        <div className='text-content'>
          <h1>Discover Our Exquisite Home Collections</h1>
          <p>
            Transform your home with our handpicked selection of furniture, decor, and kitchen essentials.Elevate your space with our stylish products today!
          </p>
          <a href="/store" class="cta-button">Explore Now</a>
        </div> 
        <div className='image-content'>
          <img src={home} alt='home' />
        </div>
      </div>
      <div className='about'>
        <h1>About Us</h1>
        <p>Shopsphere is dedicated to providing customers with high-quality home and living products that combine style and functionality. Our team carefully curates each item to ensure that your home reflects your unique taste and personality. With a focus on customer satisfaction, we strive to offer a seamless shopping experience from start to finish.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
