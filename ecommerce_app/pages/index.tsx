import { products } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-8">Featured Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
