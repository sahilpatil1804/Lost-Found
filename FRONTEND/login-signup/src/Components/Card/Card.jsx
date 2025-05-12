import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, MapPin, Clock, Info, ArrowRight, Image as ImageIcon, 
  ArrowLeft, Share2, Calendar, Tag, AlertCircle, Phone, Mail, X 
} from 'lucide-react';
import AppContext from '../Context/Context';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

export default function ItemDetailCard() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { lostData, foundData } = useContext(AppContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
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
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    let selectedItem = null;
    if (type === 'lostitem') {
      selectedItem = lostData.find(item => item.id == id);
      if (selectedItem) setItem({...selectedItem, type: 'lost'});
    } else if (type === 'founditem') {
      selectedItem = foundData.find(item => item.id == id);
      if (selectedItem) setItem({...selectedItem, type: 'found'});
    }
    
    setLoading(false);
  }, [id, type, lostData, foundData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-blue-600 text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-700 text-xl font-medium mb-6">Item not found</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isLost = item.type === 'lost';
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleShareItem = () => {
    if (navigator.share) {
      navigator.share({
        title: `${isLost ? 'Lost' : 'Found'}: ${item.itemName}`,
        text: `Check out this ${isLost ? 'lost' : 'found'} item: ${item.itemName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  
  const handleRequestItem = () => {
    const reportData = {
      reportFrom:{
        email: localStorage.getItem("userEmail")
      },
      reportTo:{
        email: item.email
      },
      reportReason:"some dummy reason",
      itemId: item.id,
      itemType: item.type 
    }
    axios.post("http://localhost:8080/api/reports", reportData).then(reponse=>{
      alert(`Request sent for ${item.itemName}!`)
    }).catch(err=>{
      alert("Error sending report!")
      console.log(err)
    })
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors text-base font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>

          <button
            onClick={handleShareItem}
            className="p-3 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Share item"
          >
            <Share2 size={20} />
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-3xl w-full mx-auto mt-28 mb-20 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Status Badge */}
        <div className="flex justify-center mb-8">
          <motion.div
            className={`px-5 py-2 rounded-full text-white text-base font-medium inline-flex items-center shadow-lg ${
              isLost ? 'bg-blue-600' : 'bg-green-600'
            }`}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{isLost ? 'Lost Item' : 'Found Item'}</span>
          </motion.div>
        </div>

        {/* Item Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Image Section */}
          <div
            className="relative w-full h-80 bg-gray-100 cursor-pointer overflow-hidden"
            onClick={() => item.imageUrl && setShowImageModal(true)}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                <ImageIcon size={64} />
                <p className="mt-4 text-gray-500">No image available</p>
              </div>
            )}

            {item.isResolved && (
              <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                Resolved
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {item.itemName}
            </h1>

            {/* Key Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Location</p>
                  <p className="text-base text-gray-800 font-medium">{item.locationLost}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Date</p>
                  <p className="text-base text-gray-800 font-medium">{formatDate(item.dateLost)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Reported By</p>
                  <p className="text-base text-gray-800 font-medium">{item.fullName}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Tag className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Category</p>
                  <p className="text-base text-gray-800 font-medium">{item.category}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div className="mb-10 bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            {/* Item Details */}
            <div className="border-t border-gray-100 pt-8 mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Item Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-500 text-sm block mb-1">Color</span>
                  <span className="text-gray-800 font-medium">{item.color}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-500 text-sm block mb-1">Brand/Model</span>
                  <span className="text-gray-800 font-medium">{item.brandModel || 'N/A'}</span>
                </div>
                {item.specialIdentifiers && (
                  <div className="col-span-1 md:col-span-2 bg-gray-50 p-4 rounded-xl mt-2">
                    <span className="text-gray-500 text-sm block mb-1">Identifiers</span>
                    <span className="text-gray-800 font-medium">{item.specialIdentifiers}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-100 pt-8 mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-base font-medium">{item.phoneNumber}</span>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-base font-medium">{item.email}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleRequestItem}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl text-lg font-medium transition-colors shadow-lg flex items-center justify-center"
            >
              {isLost ? 'I Found This Item' : 'This Is My Item'}
              <ArrowRight className="ml-3 w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && item.imageUrl && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
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
                className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all"
                onClick={() => setShowImageModal(false)}
              >
                <X size={28} />
              </button>
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}