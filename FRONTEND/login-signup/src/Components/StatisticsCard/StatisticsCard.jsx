import React from 'react';
import './StatisticsCard.css';
import { FaSearch, FaQuestion, FaCheck, FaClock } from 'react-icons/fa';

const StatisticsCard = ({ data }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'search': return <FaSearch />;
      case 'question': return <FaQuestion />;
      case 'check': return <FaCheck />;
      case 'clock': return <FaClock />;
      default: return null;
    }
  };

  return (
    <div className="statistics-card">
      <div className="statistics-icon">
        {getIcon(data.icon)}
      </div>
      <div className="statistics-content">
        <div className="statistics-count">{data.count}</div>
        <div className="statistics-title">{data.title}</div>
      </div>
    </div>
  );
};

export default StatisticsCard;