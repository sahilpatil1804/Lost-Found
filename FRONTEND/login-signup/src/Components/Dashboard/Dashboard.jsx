import React from 'react';
import './Dashboard.css';
import UserInfoCard from '../UserInfoCard/UserInfoCard';
import StatisticsCard from '../StatisticsCard/StatisticsCard';
import RecentItemsCard from '../RecentItemsCard/RecentItemsCard';

const Dashboard = () => {
  // Mock data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main St, New York, NY 10001',
    memberSince: 'January 2023',
    profileImage: null // Would be an image URL in a real app
  };

  const statistics = [
    { title: 'Items Found', count: 12, icon: 'search' },
    { title: 'Items Lost', count: 5, icon: 'question' },
    { title: 'Successful Returns', count: 9, icon: 'check' },
    { title: 'Active Requests', count: 3, icon: 'clock' }
  ];

  const timelineEvents = [
    { 
      id: 1, 
      type: 'found', 
      title: 'Found a wallet', 
      date: '2025-04-03',
      description: 'Found a brown leather wallet near Central Park'
    },
    { 
      id: 2, 
      type: 'return', 
      title: 'Returned iPhone 16', 
      date: '2025-03-28',
      description: 'Successfully returned iPhone to Sarah Williams'
    },
    { 
      id: 3, 
      type: 'lost', 
      title: 'Lost headphones', 
      date: '2025-03-15',
      description: 'Lost Sony WH-1000XM5 headphones on the subway'
    },
    { 
      id: 4, 
      type: 'request', 
      title: 'New return request', 
      date: '2025-03-10',
      description: 'Michael requested to claim the found keys'
    }
  ];

  const recentItems = [
    {
      id: 1,
      title: 'Silver Watch',
      status: 'found',
      date: '2025-04-01',
      location: 'Downtown Library',
      image: null // Would be an image URL in a real app
    },
    {
      id: 2,
      title: 'Black Backpack',
      status: 'lost',
      date: '2025-03-25',
      location: 'University Campus',
      image: null // Would be an image URL in a real app
    },
    {
      id: 3,
      title: 'House Keys',
      status: 'found',
      date: '2025-03-20',
      location: 'City Park',
      image: null // Would be an image URL in a real app
    }
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      
      <div className="dashboard-layout">
        <div className="dashboard-column main-column">
          <UserInfoCard userData={userData} />
          <div className="statistics-container">
            {statistics.map((stat, index) => (
              <StatisticsCard key={index} data={stat} />
            ))}
          </div>
        </div>
        <div className="dashboard-column side-column">
          <RecentItemsCard items={recentItems} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
