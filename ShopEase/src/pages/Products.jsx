import React, { useEffect, useState } from 'react';
import { getProducts } from '../Api/productApi';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const Products = ({ searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState('default');

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

  const handlePriceRangeChange = (range) => {
    if (selectedPriceRanges.includes(range)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedPriceRanges([]);
    if (setSearchQuery) setSearchQuery('');
  };

  const filteredProducts = products.filter((product) => {
    const query = searchQuery || '';
    const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase()) || 
                          (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;

    let matchesPrice = true;
    if (selectedPriceRanges.length > 0) {
      matchesPrice = selectedPriceRanges.some((range) => {
        if (range === '0-2500') return product.price >= 0 && product.price <= 2500;
        if (range === '2500-5000') return product.price > 2500 && product.price <= 5000;
        if (range === '5000-10000') return product.price > 5000 && product.price <= 10000;
        if (range === '10000+') return product.price > 10000;
        return true;
      });
    }

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading products...</div>;
  }

  const categoryList = ['All Categories', 'Women', 'Men', 'Electronics', 'Home & Living', 'Beauty', 'Sports', 'Toys', 'Accessories'];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">All Products ({filteredProducts.length})</h1>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-rose-600 text-gray-700 font-medium"
            >
              <option value="default">Sort by: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 h-fit space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                <SlidersHorizontal className="w-5 h-5 text-rose-600" /> Filters
              </div>
              <button 
                onClick={clearAllFilters}
                className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition"
              >
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2">
                {categoryList.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-gray-900">
                    <input 
                      type="checkbox"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4 accent-rose-600"
                    />
                    <span className={selectedCategory === cat ? 'text-rose-600 font-semibold' : ''}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  { label: 'Rs. 0 - 2,500', value: '0-2500' },
                  { label: 'Rs. 2,500 - 5,000', value: '2500-5000' },
                  { label: 'Rs. 5,000 - 10,000', value: '5000-10000' },
                  { label: 'Rs. 10,000+', value: '10000+' },
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-gray-900">
                    <input 
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.value)}
                      onChange={() => handlePriceRangeChange(range.value)}
                      className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4 accent-rose-600"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 text-center text-gray-500">
                No products found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;