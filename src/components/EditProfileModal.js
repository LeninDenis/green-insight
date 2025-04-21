import React, { useState } from 'react';
import '../styles/EditProfileModal.css';
import UserService from '../api/UserService';

const EditProfileModal = ({ user, onClose }) => {
  const [fname, setFname] = useState(user.fname || '');
  const [lname, setLname] = useState(user.lname || '');

  const handleSave = async () => {
    try {
      await UserService.updateUser(user.id, { fname, lname });
      onClose();
    } catch (e) {
      console.error('Ошибка при обновлении профиля:', e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <button className="close-button" onClick={onClose} aria-label="Закрыть">
          &times;
        </button>

        <div className="modal">
          <h2>Редактировать профиль</h2>

          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Фамилия</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <button className="author-btn">Стать автором</button>

          <div className="modal-actions">
            <button className="save-btn" onClick={handleSave}>Сохранить</button>
            <button className="cancel-btn" onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
