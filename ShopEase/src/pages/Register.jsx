import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShoppingBag } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Basic frontend validation mock
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Mock successful registration
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl w-full flex bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
        {/* Left Side - Image/Branding */}
        <div className="hidden md:flex md:w-1/2 bg-rose-50 flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="z-10 text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="bg-primary text-white p-1 rounded-md">
                <ShoppingBag size={24} />
              </div>
              <span className="font-heading font-bold text-2xl text-textDark tracking-tight">ShopEase</span>
            </Link>
            <h2 className="text-3xl font-heading font-bold text-textDark mb-4">Create Account</h2>
            <p className="text-gray-600">Join us and start your shopping journey today!</p>
          </div>
          
          <div className="z-10 mt-8 relative w-full max-w-[250px]">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-50 -z-10"></div>
             <img src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&q=80" alt="Shopping bags" className="w-full h-auto object-contain rounded-xl shadow-lg mix-blend-multiply" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-heading font-bold text-textDark mb-8">Register</h2>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Create a password"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-3 mt-4">
              Register
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-[#E01C4A]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
