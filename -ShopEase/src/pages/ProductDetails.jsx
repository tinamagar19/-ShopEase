import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

import { CartContext } from '../context/CartContext';
import { getProductById } from '../Api/productApi';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        console.error('Product API Error:', err);

        setError(
          'Unable to load this product. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    window.scrollTo(0, 0);
  }, [id]);

  const isFashionProduct =
    product?.category === 'Women' ||
    product?.category === 'Men';

  useEffect(() => {
    if (product) {
      setQuantity(1);

      setSelectedColor(
        product.colors &&
          product.colors.length > 0
          ? product.colors[0]
          : ''
      );

      setSelectedSize(
        product.sizes &&
          product.sizes.length > 0
          ? product.sizes[0]
          : isFashionProduct
            ? 'M'
            : null
      );
    }
  }, [product, isFashionProduct]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>

          <h2 className="text-xl font-semibold text-gray-900">
            Loading Product...
          </h2>

          <p className="text-gray-500 mt-2">
            Fetching product details from API
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Product Not Found
          </h1>

          <p className="text-gray-500 mb-6">
            {error ||
              'Sorry, the product you are looking for does not exist.'}
          </p>

          <Link
            to="/products"
            className="btn-primary inline-flex items-center"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedColor || null,
      isFashionProduct
        ? selectedSize
        : null
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const increaseQuantity = () => {
    if (
      product.stock &&
      quantity >= product.stock
    ) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      Math.max(1, prev - 1)
    );
  };

  const discountPercentage =
    product.oldPrice &&
      product.oldPrice > product.price
      ? Math.round(
        ((product.oldPrice -
          product.price) /
          product.oldPrice) *
        100
      )
      : 0;

  const productImages =
    product.images &&
      product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            <div>
              <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                {discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {discountPercentage}% OFF
                  </span>
                )}

                <button
                  onClick={() =>
                    setIsWishlisted(
                      !isWishlisted
                    )
                  }
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-50"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                      }`}
                  />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-contain"
                />
              </div>

              <div className="flex gap-3 mt-4 overflow-x-auto">
                {productImages
                  .slice(0, 4)
                  .map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 flex-shrink-0 border rounded-lg overflow-hidden cursor-pointer hover:border-primary"
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1
                          }`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-primary font-medium mb-2">
                {product.brand}
              </p>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <=
                            Math.round(
                              product.rating || 0
                            )
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                          }`}
                      />
                    )
                  )}
                </div>

                <span className="text-gray-500">
                  {product.rating || 0}{' '}
                  ({product.reviews || 0}{' '}
                  reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  Rs.{' '}
                  {Number(
                    product.price
                  ).toLocaleString(
                    'en-NP'
                  )}
                </span>

                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    Rs.{' '}
                    {Number(
                      product.oldPrice
                    ).toLocaleString(
                      'en-NP'
                    )}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="border-t border-gray-200 pt-6">
                {product.colors &&
                  product.colors.length >
                  0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Color
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {product.colors.map(
                          (color) => (
                            <button
                              key={color}
                              onClick={() =>
                                setSelectedColor(
                                  color
                                )
                              }
                              className={`px-4 py-2 rounded-lg border text-sm transition ${selectedColor ===
                                  color
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-gray-300 hover:border-primary'
                                }`}
                            >
                              {color}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {isFashionProduct && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">
                        Size
                      </h3>

                      <button className="text-sm text-primary hover:underline">
                        Size Guide
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(
                        product.sizes || [
                          'S',
                          'M',
                          'L',
                          'XL',
                        ]
                      ).map(
                        (size) => (
                          <button
                            key={size}
                            onClick={() =>
                              setSelectedSize(
                                size
                              )
                            }
                            className={`px-5 py-2 rounded-lg border text-sm transition ${selectedSize ===
                                size
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-300 hover:border-primary'
                              }`}
                          >
                            {size}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Quantity
                  </h3>

                  <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                    <button
                      onClick={
                        decreaseQuantity
                      }
                      disabled={
                        quantity <= 1
                      }
                      className="p-3 hover:bg-gray-100 disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="px-5 font-semibold">
                      {quantity}
                    </span>

                    <button
                      onClick={
                        increaseQuantity
                      }
                      disabled={
                        product.stock &&
                        quantity >=
                        product.stock
                      }
                      className="p-3 hover:bg-gray-100 disabled:opacity-40"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {product.stock > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      {product.stock} items
                      available
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={
                      handleAddToCart
                    }
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>

                  <button
                    onClick={
                      handleBuyNow
                    }
                    className="flex-1 border-2 border-primary text-primary rounded-lg py-3 font-semibold hover:bg-primary hover:text-white transition"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-primary" />

                    <div>
                      <p className="font-medium text-sm">
                        Free Shipping
                      </p>

                      <p className="text-xs text-gray-500">
                        On orders over Rs. 5,000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-6 h-6 text-primary" />

                    <div>
                      <p className="font-medium text-sm">
                        7 Days Return
                      </p>

                      <p className="text-xs text-gray-500">
                        Easy return policy
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-primary" />

                    <div>
                      <p className="font-medium text-sm">
                        Secure Payment
                      </p>

                      <p className="text-xs text-gray-500">
                        Safe checkout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="flex border-b overflow-x-auto">
              <button
                onClick={() =>
                  setActiveTab(
                    'description'
                  )
                }
                className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab ===
                    'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500'
                  }`}
              >
                Description
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    'reviews'
                  )
                }
                className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab ===
                    'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500'
                  }`}
              >
                Reviews
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    'shipping'
                  )
                }
                className={`px-6 py-4 font-semibold whitespace-nowrap ${activeTab ===
                    'shipping'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500'
                  }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="p-6 lg:p-10">
              {activeTab ===
                'description' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Product Description
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

              {activeTab ===
                'reviews' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Customer Reviews
                    </h2>

                    <p className="text-gray-600">
                      This product has
                      received{' '}
                      {product.reviews ||
                        0}{' '}
                      customer reviews
                      with an average
                      rating of{' '}
                      {product.rating ||
                        0}.
                    </p>
                  </div>
                )}

              {activeTab ===
                'shipping' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      Shipping & Returns
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                      We offer convenient
                      shipping options and
                      a simple 7-day return
                      policy for eligible
                      products.
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;