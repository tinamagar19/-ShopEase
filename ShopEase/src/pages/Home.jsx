import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../Api/productApi';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider mb-3 block">
              Welcome to ShopEase
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Quality Products at Best Prices
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Shop the latest electronics, fashion, and home essentials with fast delivery and secure payments across Nepal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition inline-flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products" className="border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition">
                View Deals
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="Shopping"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-orange-100 to-rose-100 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="p-10 md:w-1/2">
            <span className="text-sm font-bold text-rose-600 tracking-wider uppercase mb-2 block">Special Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Up to 60% Off
            </h2>
            <p className="text-gray-700 mb-6">
              Top Brands, Best Deals. Don't miss out on our biggest sale of the season.
            </p>
            <Link to="/products" className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition inline-block">
              Shop Sale
            </Link>
          </div>

          <div className="md:w-1/2 w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1608156688204-7b79a52865cd?w=800&q=80" 
              alt="Sale" 
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-rose-600 font-semibold hover:underline">
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading featured products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;