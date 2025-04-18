import React, { useState } from 'react';
import '../styles/EditProfileModal.css';

const EditProfileModal = ({ user, onClose }) => {
  const [fname, setFname] = useState(user.fname || '');
  const [lname, setLname] = useState(user.lname || '');

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактировать профиль</h2>
        <div className="form-group">
          <label>Имя</label>
          <input value={fname} onChange={(e) => setFname(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Фамилия</label>
          <input value={lname} onChange={(e) => setLname(e.target.value)} />
        </div>

        <button className="author-btn">Стать автором</button>

        <div className="modal-actions">
          <button className="save-btn">Сохранить</button>
          <button className="cancel-btn" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;