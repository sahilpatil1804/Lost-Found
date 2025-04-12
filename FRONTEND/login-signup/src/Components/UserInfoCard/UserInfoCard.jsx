import React from 'react';
import './UserInfoCard.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const UserInfoCard = ({ userData }) => {
  return (
    <div className="card user-info-card">
      <div className="card-header">
        <h3>Personal Information</h3>
        <button className="edit-button">Edit</button>
      </div>
      <div className="user-info-content">
        <div className="user-avatar-large">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt={userData.name} />
          ) : (
            <FaUser />
          )}
        </div>
        <div className="user-details">
          <h2 className="user-name-large">{userData.name}</h2>
          <div className="details-grid">
            <div className="detail-item">
              <FaEnvelope className="detail-icon" />
              <div>
                <div className="detail-label">Email</div>
                <div className="detail-value">{userData.email}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaPhone className="detail-icon" />
              <div>
                <div className="detail-label">Phone</div>
                <div className="detail-value">{userData.phone}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <div>
                <div className="detail-label">Address</div>
                <div className="detail-value">{userData.address}</div>
              </div>
            </div>
            <div className="detail-item">
              <FaCalendarAlt className="detail-icon" />
              <div>
                <div className="detail-label">Member Since</div>
                <div className="detail-value">{userData.memberSince}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
