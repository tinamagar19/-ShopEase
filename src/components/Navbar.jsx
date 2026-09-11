import { Link } from "react-router-dom";
import { Search, Heart, User, Menu, ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
        
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-rose-500 p-1.5 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">ShopEase</span>
          </Link>

        
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-900 font-medium hover:text-rose-500 transition">Home</Link>
            <Link to="/products" className="text-gray-900 font-medium hover:text-rose-500 transition">Products</Link>
            <Link to="#" className="text-gray-500 hover:text-rose-500 transition">Offers</Link>
            <Link to="#" className="text-gray-500 hover:text-rose-500 transition">Blog</Link>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm"
            />
          </div>

        
          <div className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-rose-500 transition">
              <Heart className="w-5 h-5" />
            </button>
            <Link to="/cart" className="relative text-gray-500 hover:text-rose-500 transition">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                1
              </span>
            </Link>
            <button className="text-gray-500 hover:text-rose-500 hidden sm:block transition">
              <User className="w-5 h-5" />
            </button>
            <button className="md:hidden text-gray-500">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;