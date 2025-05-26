import React, { useState } from 'react';
import '../styles/SendLinkModal.css';

const SendLinkModal = ({ onClose, onSubmit }) => {
  const [link, setLink] = useState('');

  const handleSubmit = () => {
    if (link.trim()) {
      onSubmit(link);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-cross" onClick={onClose}>&times;</button>
        <h2>Отправка ссылки</h2>
        <input
          type="text"
          placeholder="Вставьте ссылку на диск"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="modal-submit">Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default SendLinkModal;
