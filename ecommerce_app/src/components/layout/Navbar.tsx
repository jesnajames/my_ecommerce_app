import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import CartDrawer from '../cart/CartDrawer';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav className="bg-[#232F3E] sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 
                className="text-white text-2xl font-bold cursor-pointer" 
                onClick={() => navigate('/')}
              >
                EcomStore
              </h1>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <input
                type="text"
                placeholder="Search products..."
                className="input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white">
                    {user.email}
                  </span>
                  <button 
                    className="text-white hover:text-[#FF9900]"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    className="text-white hover:text-[#FF9900]"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </button>
                  <button 
                    className="text-white hover:text-[#FF9900]"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </button>
                </div>
              )}
              <button 
                className="text-white hover:text-[#FF9900] relative"
                onClick={() => setIsCartOpen(true)}
              >
                <FaShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF9900] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
