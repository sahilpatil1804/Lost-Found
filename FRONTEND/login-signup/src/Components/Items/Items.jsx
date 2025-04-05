import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDetail.css';

const ItemDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        // Replace with your actual API endpoint
        const endpoint = `/api/${type}-items/${id}`;
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} item details`);
        }
        
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItemDetails();
  }, [type, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Function to convert byte array to image URL
  const getImageUrl = (item) => {
    if (item && item.imageDate && item.imageType) {
      const base64Image = btoa(
        new Uint8Array(item.imageDate).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      return `data:${item.imageType};base64,${base64Image}`;
    }
    return 'https://via.placeholder.com/300x200?text=No+Image';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="loading-container">Loading item details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="not-found-container">
        <h2>Item Not Found</h2>
        <p>The requested item could not be found.</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        &larr; Back to Browse
      </button>
      
      <div className="item-detail-content">
        <div className="item-detail-header">
          <h1>{item.itemName}</h1>
          <span className={`status-badge ${item.isResolved ? 'resolved' : 'open'}`}>
            {item.isResolved ? 'Resolved' : 'Open'}
          </span>
        </div>
        
        <div className="item-detail-grid">
          <div className="item-detail-image">
            <img 
              src={getImageUrl(item)} 
              alt={item.itemName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
          </div>
          
          <div className="item-detail-info">
            <div className="info-group">
              <h2>Item Information</h2>
              
              <div className="info-row">
                <span className="info-label">Category:</span>
                <span className="info-value">{item.category || 'N/A'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Date {type === 'lost' ? 'Lost' : 'Found'}:</span>
                <span className="info-value">{formatDate(item.dateLost)}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Time {type === 'lost' ? 'Lost' : 'Found'}:</span>
                <span className="info-value">{item.timeLost || 'N/A'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Location {type === 'lost' ? 'Lost' : 'Found'}:</span>
                <span className="info-value">{item.locationLost || 'N/A'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Color:</span>
                <span className="info-value">{item.color || 'N/A'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Brand/Model:</span>
                <span className="info-value">{item.brandModel || 'N/A'}</span>
              </div>
            </div>
            
            <div className="info-group">
              <h2>Special Identifiers</h2>
              <p className="special-identifiers">
                {item.specialIdentifiers || 'No special identifiers provided'}
              </p>
            </div>
            
            <div className="info-group">
              <h2>Description</h2>
              <p className="description">
                {item.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="contact-section">
          <h2>Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-label">Name:</span>
              <span className="contact-value">{item.fullName || 'N/A'}</span>
            </div>
            
            <div className="contact-item">
              <span className="contact-label">Phone:</span>
              <span className="contact-value">{item.phoneNumber || 'N/A'}</span>
            </div>
            
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <span className="contact-value">{item.email || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;