import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../Api/productApi';
import { Star, ShoppingCart, ArrowLeft, Check } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data.image);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="py-24 text-center text-gray-500">Loading product details...</div>;
  }

  if (!product) {
    return <div className="py-24 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="h-[400px] w-full bg-gray-100 rounded-xl overflow-hidden border">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`h-20 w-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${selectedImage === img ? 'border-rose-600' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {product.brand && (
              <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider mb-2">
                {product.brand}
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-800">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">Rs. {product.price}</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">Rs. {product.oldPrice}</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Size</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border font-semibold text-sm transition ${selectedSize === size ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded-lg w-max">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition rounded-l-lg"
                >
                  -
                </button>
                <span className="px-6 font-semibold text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-auto">
              <button 
                onClick={() => alert('Product added to cart successfully!')}
                className="flex-1 bg-rose-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-rose-700 transition flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button 
                onClick={() => alert('Proceeding to checkout...')}
                className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;