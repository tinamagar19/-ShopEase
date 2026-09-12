import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User } from 'lucide-react';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    if (setSearchQuery) {
      setSearchQuery(e.target.value);
    }
    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
    
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-gray-900">
          <span className="bg-rose-600 text-white p-2 rounded-xl"><ShoppingBag className="w-6 h-6" /></span>
          ShopEase
        </Link>

     
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link to="/" className="hover:text-rose-600 transition">Home</Link>
          <Link to="/products" className="hover:text-rose-600 transition">Products</Link>
          <Link to="/offers" className="hover:text-rose-600 transition">Offers</Link>
          <Link to="/blog" className="hover:text-rose-600 transition">Blog</Link>
        </div>

     
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchQuery || ''}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-rose-600 text-sm"
          />
        </div>

     
        <div className="flex items-center gap-6 text-gray-700">
          <button className="hover:text-rose-600 transition"><Heart className="w-6 h-6" /></button>
          <Link to="/cart" className="hover:text-rose-600 transition relative">
            <ShoppingBag className="w-6 h-6" />
          </Link>
          <Link to="/login" className="hover:text-rose-600 transition"><User className="w-6 h-6" /></Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;