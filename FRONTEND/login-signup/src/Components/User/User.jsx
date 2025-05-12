import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./User.css";

const Userx = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setError("Failed to load user information");
        setLoading(false);
      });
      
    // Fetch existing chat messages if any
    axios.get(`http://localhost:8080/api/chats/${userId}`)
      .then(response => {
        if (response.data) {
          setChatMessages(response.data);
        }
      })
      .catch(err => {
        console.error("Error fetching chat history:", err);
      });
  }, [userId]);
  
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      senderId: localStorage.getItem("userId"),
      receiverId: userId,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    // Add message to local state optimistically
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
    
    // Send to API
    axios.post(`http://localhost:8080/api/chats/send`, newMessage)
      .catch(err => {
        console.error("Error sending message:", err);
        // Could implement retry or notification here
      });
  };
  
  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="user-loading">
        <div className="loading-text">Loading user profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-error">
        <p className="error-message">{error || "User not found"}</p>
        <button onClick={goBack} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="user-container">
      <button onClick={goBack} className="back-link">
        <span className="back-arrow">←</span> Back
      </button>
      
      <div className="user-card">
        <div className="user-info">
          <div className="user-header">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h1 className="user-name">{user.name || "User"}</h1>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setShowChat(!showChat)}
            className="chat-toggle-button"
          >
            {showChat ? "Hide Chat" : "Chat with User"}
          </button>
        </div>
        
        <div className="user-metadata">
          <div className="metadata-item">
            <p className="metadata-label">Member Since</p>
            <p className="metadata-value">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="metadata-item">
            <p className="metadata-label">Status</p>
            <p className="metadata-value">
              {user.active ? "Active" : "Inactive"}
            </p>
          </div>
          {user.location && (
            <div className="metadata-item">
              <p className="metadata-label">Location</p>
              <p className="metadata-value">{user.location}</p>
            </div>
          )}
          {user.phone && (
            <div className="metadata-item">
              <p className="metadata-label">Contact</p>
              <p className="metadata-value">{user.phone}</p>
            </div>
          )}
        </div>
        
        {user.bio && (
          <div className="user-bio">
            <h2 className="bio-title">About</h2>
            <p className="bio-content">{user.bio}</p>
          </div>
        )}
        
        {showChat && (
          <div className="chat-section">
            <h2 className="chat-title">Chat</h2>
            
            <div className="chat-messages">
              {chatMessages.length === 0 ? (
                <p className="no-messages">No messages yet. Start the conversation!</p>
              ) : (
                <div className="message-list">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`message ${
                        msg.senderId === localStorage.getItem("userId") 
                          ? "sent-message" 
                          : "received-message"
                      }`}
                    >
                      <p className="message-content">{msg.content}</p>
                      <p className="message-timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <form onSubmit={sendMessage} className="message-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="message-input"
              />
              <button
                type="submit"
                className="send-button"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userx;