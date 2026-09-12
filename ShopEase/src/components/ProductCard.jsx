import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col"
    >
      <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        {product.brand && (
          <span className="text-xs text-gray-500 mb-1">{product.brand}</span>
        )}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <span className="font-bold text-gray-900">Rs. {product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              Rs. {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;