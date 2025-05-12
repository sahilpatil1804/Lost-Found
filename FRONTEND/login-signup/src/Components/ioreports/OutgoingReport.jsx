import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./IncomingReport.css";

const OutgoingReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const curUser = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8080/api/reports")
      .then(response => {
        console.log(`Here it is ${curUser}`);
        const incoming = response.data.filter(report => report.reportFrom.email === curUser);
        setReports(incoming);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [curUser]);

  const viewItem = (itemType, itemId) => {
    navigate(`/item/${itemType+'item'}/${itemId}`);
  };

  const viewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="incoming-reports-container">
      <h2 className="section-title">Outgoing Reports</h2>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">Loading reports...</div>
        </div>
      ) : reports.length === 0 ? (
        <div className="empty-state">
          No incoming reports found.
        </div>
      ) : (
        <div className="reports-list">
          {reports.map(report => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <div>
                  <p className="report-sender">From: <span>{report.reportFrom.email}</span></p>
                  <h3 className="report-reason">Reason: {report.reportReason}</h3>
                </div>
                <span className={`status-badge status-${report.status}`}>
                  {report.status}
                </span>
              </div>
              
              <div className="action-buttons">
                <button
                  onClick={() => viewItem(report.itemType, report.itemId)}
                  className="btn btn-primary"
                >
                  View Item
                </button>
                <button
                  onClick={() => viewUser(report.reportTo.email)}
                  className="btn btn-secondary"
                >
                  View User Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OutgoingReport;