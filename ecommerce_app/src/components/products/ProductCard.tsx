import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    console.log("Adding item to cart", product.title);
    onAddToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-400" />
          <span className="ml-1">{product.rating}</span>
          <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
        </div>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;