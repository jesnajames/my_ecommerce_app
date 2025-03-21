import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/product';
import { fetchProductById, fetchProducts } from '../../utils/productUtils';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
        setLoading(false);
        if (fetchedProduct) {
          const products = await fetchProducts(fetchedProduct.category);
          setRelatedProducts(products.filter(p => p.id !== fetchedProduct.id));
        }
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-xl text-center">Product not found</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-xl font-semibold text-gray-900">${product.price}</p>
            <p className="text-gray-700">{product.description}</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < product.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.reviews || 0} reviews)
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-8">
              {/* <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{review.username}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div> */}
              
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link to={`/product/${relatedProduct.id}`}>
              <div key={relatedProduct.id} className="border p-4 rounded">
                <img src={relatedProduct.image} alt={relatedProduct.title} className="w-full h-48 object-cover mb-2" />
                <h3 className="text-lg font-semibold">{relatedProduct.title}</h3>
                <p className="text-gray-700">${relatedProduct.price}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Vendor Details</h2>
            <p>Information about vendors and their policies.</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">Quality Assurance</h2>
            <p>Details about our quality assurance policies.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p>Email: support@ecomstore.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
    
  );
};

export default ProductDetails;