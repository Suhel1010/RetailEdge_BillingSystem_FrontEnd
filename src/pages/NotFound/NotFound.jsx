import { useNavigate } from 'react-router-dom';
import './NotFound.css';

import React from 'react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-title">
          <div className="not-found-subtitle">Oops! Page not found</div>
          <p className="not-found-message">The page you are looking does not exist or has been removed </p>
          <button className="not-found-button " onClick={() => navigate('/dashboard')}>
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
