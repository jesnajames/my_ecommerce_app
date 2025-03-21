import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#232F3E] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#FF9900]">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Press Releases</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#FF9900]">Sell products</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Become an Affiliate</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Advertise Your Products</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#FF9900]">Business Card</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Shop with Points</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Reload Your Balance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#FF9900]">Your Account</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Your Orders</a></li>
              <li><a href="#" className="hover:text-[#FF9900]">Help Center</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
