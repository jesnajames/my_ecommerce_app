import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="related-products-grid">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="related-product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
