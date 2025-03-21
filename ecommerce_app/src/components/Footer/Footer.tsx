import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <div className="footer-section">
          <h3>Customer Service</h3>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/returns">Returns</Link>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your E-commerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
