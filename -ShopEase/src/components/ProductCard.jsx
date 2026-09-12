import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 overflow-hidden bg-gray-100 relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition duration-300" 
          />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-primary font-medium mb-1">{product.brand}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 truncate mb-2 hover:text-primary">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">Rs. {Number(product.price).toLocaleString('en-NP')}</span>
          <Link 
            to={`/products/${product.id}`}
            className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-primary/90 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;