import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Browse.css'; // Make sure to create this CSS file
import AppContext from "../Context/Context";

const Browse = () => {
  const location = useLocation();
  const isBrowsingLost = location.pathname === '/browse-lost-items';
  const pageTitle = isBrowsingLost ? 'Browse Lost Items' : 'Browse Found Items';
const {
    lostData,
    foundData,
    isLostError,
    isFoundError
  } = useContext(AppContext);
  // State for items, filters and search
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    dateRange: '',
    status: ''
  });
  
  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
        if (isLostError || isFoundError) {
        return (
            <div className="error-container">
            <h2>Error loading data...</h2>
            </div>
        );
        }
        const allItems = [
        ...lostData.map(obj => ({ ...obj, type: 'lost', date: obj.dateLost, title: obj.itemName, location: obj.locationLost,  status: obj.isResolved ? 'closed' : 'open' })),
        ...foundData.map(obj => ({ ...obj, type: 'found', date: obj.dateFound, title: obj.itemName, location: obj.locationFound,status: obj.isResolved ? 'closed' : 'open' }))
        ];

    //        const mockItems = [
    //    {
    //      id: 1,
    //      title: 'Blue Backpack',
    //      description: 'Blue Jansport backpack with laptop inside',
    //      category: 'Bag',
    //      location: 'Library',
    //      date: '2025-03-28',
    //      status: 'Open',
    //      image: 'https://via.placeholder.com/150',
    //      type: 'lost'
    //    },
    //    {
    //      id: 2,
    //      title: 'iPhone 17',
    //      description: 'Black iPhone with cracked screen',
    //      category: 'Electronics',
    //      location: 'Cafeteria',
    //      date: '2025-04-01',
    //      status: 'Open',
    //      image: 'https://via.placeholder.com/150',
    //      type: 'lost'
    //    },
    //    {
    //      id: 3,
    //      title: 'Car Keys',
    //      description: 'Honda car keys with rainbow keychain',
    //      category: 'Keys',
    //      location: 'Parking Lot',
    //      date: '2025-04-02',
    //      status: 'Open',
    //      image: 'https://via.placeholder.com/150',
    //      type: 'found'
    //    },
    //    {
    //      id: 4,
    //      title: 'Textbook',
    //      description: 'Chemistry 101 textbook',
    //      category: 'Book',
    //      location: 'Science Building',
    //      date: '2025-03-25',
    //      status: 'Closed',
    //      image: 'https://via.placeholder.com/150',
    //      type: 'found'
    //    }
    //  ];
      const mockItems = allItems
      
      const pageItems = mockItems.filter(item => 
        isBrowsingLost ? item.type === 'lost' : item.type === 'found'
      );
      
      setItems(pageItems);
      setFilteredItems(pageItems);
      setLoading(false);
    }, 1000);
  }, [isBrowsingLost]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, filters);
  };
  
  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };
  
  // Apply filters and search term
  const applyFilters = (search, currentFilters) => {
    let result = [...items];
    
    // Apply search term
    if (search) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply category filter
    if (currentFilters.category) {
      result = result.filter(item => item.category === currentFilters.category);
    }
    
    // Apply location filter
    if (currentFilters.location) {
      result = result.filter(item => item.location === currentFilters.location);
    }
    
    // Apply date range filter
    if (currentFilters.dateRange) {
      // This is a simplified example - implement actual date range logic
      const daysAgo = parseInt(currentFilters.dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
      
      result = result.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= cutoffDate;
      });
    }
    
    // Apply status filter
    if (currentFilters.status) {
      result = result.filter(item => item.status === currentFilters.status);
    }
    
    setFilteredItems(result);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      location: '',
      dateRange: '',
      status: ''
    });
    setFilteredItems(items);
  };
  
  // Get unique values for filter options
  const getUniqueFilterValues = (key) => {
    return [...new Set(items.map(item => item[key]))];
  };

  return (
    <div className="browse-container">
      <h1 className="page-title">{pageTitle}</h1>
      
      <div className="search-filter-container">
        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <label style={{color:'black'}}>Category:</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {getUniqueFilterValues('category').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label style={{color:'black'}}>Location:</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              {getUniqueFilterValues('location').map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label style={{color:'black'}}>Date Range:</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="">All Time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label style={{color:'black'}}>Status:</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
      
      {/* Results */}
      <div className="results-container">
        {loading ? (
          <div className="loading">Loading items...</div>
        ) : filteredItems.length === 0 ? (
          <div className="no-results">No items found matching your criteria</div>
        ) : (
          <div className="items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="item-card">
                <div className="item-image">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <span className="item-category">{item.category}</span>
                    <span className="item-location">{item.location}</span>
                    <span className="item-date">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <span className={`item-status status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;