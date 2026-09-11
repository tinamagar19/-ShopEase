import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../Api/productApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      
  
      <aside className="w-full md:w-64 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Filters</h2>
        
    
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-rose-500 font-medium cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-rose-500 text-rose-500 focus:ring-rose-500 w-4 h-4" /> All Categories
            </label>
            {['Women', 'Men', 'Electronics', 'Home & Living', 'Beauty', 'Sports'].map(cat => (
              <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500 w-4 h-4" /> {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
          <div className="space-y-3">
            {['Rs. 0 - 2,500', 'Rs. 2,500 - 5,000', 'Rs. 5,000 - 10,000', 'Rs. 10,000+'].map(price => (
              <label key={price} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500 w-4 h-4" /> {price}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1">
        
      
        <div className="bg-[#f4ebe1] rounded-2xl p-8 mb-8 flex items-center justify-between overflow-hidden relative">
          <div className="z-10 relative">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">New Season<br/>New Styles</h1>
            <p className="text-gray-600">Explore the latest collection</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" 
            alt="Banner Model" 
            className="absolute right-0 top-0 bottom-0 h-full w-1/2 object-cover mix-blend-multiply opacity-80"
          />
        </div>

      
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
            <p className="text-sm text-gray-500 mt-1">Showing {products.length} results</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border-gray-200 rounded-lg focus:ring-rose-500 focus:border-rose-500">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

   
        {loading ? (
          <div className="py-20 text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;