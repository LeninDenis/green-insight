import React from 'react';
import '../../styles/UI/ErrorPopup.css';

const ErrorPopup = ({ status, message, onClose }) => {
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <span className="error-popup-close" onClick={onClose}>×</span>
        <h4>Ошибка {status}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;
