import { useEffect, useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProductDetails from './components/products/ProductDetails';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ProductGrid from './components/products/ProductGrid';
import CheckoutPage from './components/checkout/CheckoutPage';
import TrackOrder from './components/orders/TrackOrder';
import OrderList from './components/orders/OrderList';

import {fetchProducts} from './utils/productUtils';
import { Product } from './types/product';
import './App.css';
import {categories} from './data/categories';
import CategoryFilter from './components/CategoryFilter';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      console.log("Fetching results..")
      const fetchedProducts = await fetchProducts(selectedCategory);
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, [selectedCategory]);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <Navbar/>
            <Routes>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/login" element={<SignIn/>}/>
              <Route 
                path="/orders"
                element={
                  <PrivateRoute>
                    <OrderList />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={
                <PrivateRoute>
                  <main className='flex-grow'>
                    <h1 className='text-3xl font-bold'>Featured Products</h1>
                    <CategoryFilter 
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                    />
                    {loading ? (
                      <div className="flex justify-center items-center min-h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                      </div>
                    ): (
                      <ProductGrid products={products}/>
                    )}
                  </main>
                </PrivateRoute>
              } />
              <Route 
                path="/product/:id"
                element={
                  <PrivateRoute>
                    <ProductDetails />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage/>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/track-order/:orderId"
                element={
                  <PrivateRoute>
                    <TrackOrder />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </Elements>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
