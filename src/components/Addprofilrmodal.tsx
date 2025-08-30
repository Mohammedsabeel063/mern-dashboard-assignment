import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Instagram, 
  Youtube, 
  Camera, 
  Upload,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap
} from 'lucide-react';

interface AddProfileModalProps {
  onClose: () => void;
  isDarkMode?: boolean;
}

export const AddProfileModal: React.FC<AddProfileModalProps> = ({ onClose, isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    youtube: '',
    avatar: null as File | null,
    bio: '',
    location: '',
    website: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const inputBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const inputBorderColor = isDarkMode ? "border-gray-600" : "border-gray-300";

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'social', label: 'Social Media', icon: Instagram },
    { id: 'advanced', label: 'Advanced', icon: Zap }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  {formData.avatar ? (
                    <img 
                      src={URL.createObjectURL(formData.avatar)} 
                      alt="Avatar" 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                  <Camera className="w-3 h-3 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">Click to upload avatar</p>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Full Name*
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor} ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <motion.p 
                  className="text-red-500 text-xs mt-1 flex items-center space-x-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.name}</span>
                </motion.p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Email Address*
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor} ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <motion.p 
                  className="text-red-500 text-xs mt-1 flex items-center space-x-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </motion.p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Phone Number*
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor} ${
                  errors.phone ? 'border-red-500' : ''
                }`}
              />
              {errors.phone && (
                <motion.p 
                  className="text-red-500 text-xs mt-1 flex items-center space-x-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.phone}</span>
                </motion.p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor}`}
              />
            </div>
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter your location"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor}`}
              />
            </div>
          </motion.div>
        );

      case 'social':
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2 flex items-center space-x-2`}>
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                placeholder="https://instagram.com/username"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2 flex items-center space-x-2`}>
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube</span>
              </label>
              <input
                type="url"
                value={formData.youtube}
                onChange={(e) => handleInputChange('youtube', e.target.value)}
                placeholder="https://youtube.com/username"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputBgColor} ${inputBorderColor} ${textColor}`}
              />
            </div>
          </motion.div>
        );

      case 'advanced':
        return (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">AI Profile Optimization</span>
              </div>
              <p className="text-xs text-blue-600">
                Our AI will analyze your profile and suggest optimizations for better visibility and engagement.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className={`${bgColor} rounded-2xl w-full max-w-2xl mx-4 shadow-2xl border ${borderColor} overflow-hidden`}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${borderColor}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${textColor}`}>Create New Profile</h2>
                <p className={`text-sm ${subtitleColor}`}>Add a new profile to your dashboard</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${isDarkMode ? 'hover:bg-gray-800' : ''}`}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>

          {/* Enhanced Tabs */}
          <div className={`flex border-b ${borderColor}`}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-4 text-sm font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? `${textColor} border-b-2 border-blue-500`
                    : `${subtitleColor} hover:${textColor}`
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between p-6 border-t ${borderColor}`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Profile creation in progress...</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={onClose}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Create Profile</span>
                  </div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Success Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center text-white">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Profile Created!</h3>
                  <p className="text-green-100">Your new profile has been successfully added.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};