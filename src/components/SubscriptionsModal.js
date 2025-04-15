import React from 'react';
import '../styles/SubscriptionsModal.css';

const SubscriptionsModal = ({ subscriptions, onClose }) => {
  return (
    <div className="subscriptions-overlay">
      <div className="subscriptions-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h3>Мои подписки</h3>
        {subscriptions.length > 0 ? (
          <ul>
            {subscriptions.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>У вас пока нет подписок.</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsModal;
