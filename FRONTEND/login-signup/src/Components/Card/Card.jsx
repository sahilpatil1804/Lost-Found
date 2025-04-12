import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, MapPin, Clock, Info, ArrowRight, Image as ImageIcon, ArrowLeft, Share2, Calendar, Tag, Briefcase, AlertCircle, Phone, Mail } from 'lucide-react';
import  AppContext  from '../Context/Context'; // Import your app context
import { motion, AnimatePresence } from "framer-motion";

export default function ItemDetailCard() {
  const { type, id } = useParams(); // Get the item ID from URL params
  const navigate = useNavigate();
  const { lostData, foundData } = useContext(AppContext); // Get items from context
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  useEffect(() => {
    if (showImageModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showImageModal]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    let selecteditem = null
    if(type == 'lostitem'){
        selecteditem = lostData.find(item => item.id == id)
        if(selecteditem) setItem({...selecteditem, type:'lost'})
    }
    else if(type == 'founditem'){
        selecteditem = foundData.find(item => item.id == id)
        if(selecteditem) setItem({...selecteditem, type:'found'})
    }
    
    setLoading(false);
  }, [id, type, lostData, foundData]);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto p-8 text-center">
        <p className="text-blue-600">Loading item details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-full max-w-md mx-auto p-8 text-center">
        <p className="text-red-500">Item not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isLost = item.type === 'lost';
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
   const handleShareItem = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `${isLost ? 'Lost' : 'Found'}: ${item.itemName}`,
        text: `Check out this ${isLost ? 'lost' : 'found'} item: ${item.itemName}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      alert("Share link copied to clipboard!");
    }
  };
  const handleRequestItem = () => {
    // Handle the request logic here
    alert(`Request sent for ${item.name}!`);
    // You can also use your context methods to update state
    // e.g., context.sendItemRequest(item.id)
  };
  
  return (
  <div className="min-h-screen bg-gray-50 py-10 px-6 sm:px-8 md:px-12 flex flex-col items-center">
    {/* Sticky Header */}
    <motion.div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 sm:px-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>All Items</span>
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShareItem}
          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          aria-label="Share item"
        >
          <Share2 size={20} />
        </motion.button>
      </div>
    </motion.div>

    {/* Main Content */}
    <motion.div
      className="max-w-3xl w-full mx-auto mt-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status & ID */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <motion.div
          className={`px-4 py-2 rounded-xl text-white inline-flex items-center ${
            isLost ? 'bg-blue-600' : 'bg-green-600'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">{isLost ? 'Lost Item' : 'Found Item'}</span>
        </motion.div>
        <motion.span
          className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-mono"
          whileHover={{ y: -2 }}
        >
          ID: {item.id}
        </motion.span>
      </div>

      {/* Item Card */}
      <motion.div
        className="bg-white rounded-3xl shadow-md overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Image Section */}
        <div
          className="relative w-full h-80 sm:h-96 bg-blue-50 cursor-pointer"
          onClick={() => item.imageUrl && setShowImageModal(true)}
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.itemName}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-blue-300">
              <ImageIcon size={64} />
              <p className="text-lg mt-4 font-medium">No image available</p>
            </div>
          )}

          {/* Overlay Elements */}
          {item.imageUrl && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
              Click to enlarge
            </div>
          )}
          {item.isResolved && (
            <motion.div
              className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <span className="font-medium">Resolved</span>
            </motion.div>
          )}
        </div>

        {/* Details */}
        <div className="p-8 text-center">
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {item.itemName}
          </motion.h1>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto text-left">
            {[
              {
                icon: <MapPin className="w-6 h-6 text-blue-600" />,
                title: 'Location',
                content: item.locationLost,
              },
              {
                icon: <Calendar className="w-6 h-6 text-blue-600" />,
                title: 'Date & Time',
                content: (
                  <>
                    <p>{formatDate(item.dateLost)}</p>
                    <p className="text-sm text-gray-600">{item.timeLost}</p>
                  </>
                ),
              },
              {
                icon: <User className="w-6 h-6 text-blue-600" />,
                title: 'Reported By',
                content: item.fullName,
              },
              {
                icon: <Tag className="w-6 h-6 text-blue-600" />,
                title: 'Category',
                content: item.category,
              },
            ].map(({ icon, title, content }, i) => (
              <motion.div
                key={title}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="bg-blue-50 p-3 rounded-full mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-700">{title}</h3>
                <div className="text-gray-800 mt-1">{content}</div>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <motion.div
            className="mb-10 max-w-2xl mx-auto text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-gray-700">Description</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 leading-relaxed">
                {item.description || 'No description provided.'}
              </p>
            </div>
          </motion.div>

          {/* Item Details */}
          <motion.div
            className="mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center mb-4">
              <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-gray-700">Item Details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="text-sm text-gray-500">Color</span>
                <p className="text-gray-800 font-medium">{item.color}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Brand/Model</span>
                <p className="text-gray-800 font-medium">{item.brandModel}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-sm text-gray-500">Special Identifiers</span>
                <p className="text-gray-800 font-medium">{item.specialIdentifiers || 'None specified'}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="bg-blue-50 rounded-lg p-6 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <Phone className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-sm text-blue-600">Phone</span>
                <p className="text-blue-800 font-medium">{item.phoneNumber}</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-sm text-blue-600">Email</span>
                <p className="text-blue-800 font-medium">{item.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Request Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="max-w-md mx-auto"
          >
            <motion.button
              onClick={handleRequestItem}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLost ? 'I Found This Item' : 'This Is My Item'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        className="mt-10 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && item.imageUrl && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-screen w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white transition-all duration-200 z-10"
                onClick={() => setShowImageModal(false)}
              >
                <X size={24} />
              </button>
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);
 
}