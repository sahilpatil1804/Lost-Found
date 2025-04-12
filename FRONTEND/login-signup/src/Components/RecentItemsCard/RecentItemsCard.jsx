import React from 'react';
import './RecentItemsCard.css';
import { FaCamera } from 'react-icons/fa';

const RecentItemsCard = ({ items }) => {
  return (
    <div className="card recent-items-card">
      <div className="card-header">
        <h3>Recent Items</h3>
        <button className="view-all-button">View All</button>
      </div>
      <div className="recent-items-content">
        {items.map(item => (
          <div className="recent-item" key={item.id}>
            <div className="item-image">
              {item.image ? (
                <img src={item.image} alt={item.title} />
              ) : (
                <FaCamera />
              )}
            </div>
            <div className="item-details">
              <h4 className="item-title">{item.title}</h4>
              <div className={`item-status ${item.status}`}>
                {item.status === 'found' ? 'Found' : 'Lost'}
              </div>
              <div className="item-info">
                <div className="item-location">{item.location}</div>
                <div className="item-date">{new Date(item.date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentItemsCard;
