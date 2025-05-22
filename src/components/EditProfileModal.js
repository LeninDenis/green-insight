import React, { useState } from 'react';
import '../styles/EditProfileModal.css';
import UserService from '../api/UserService';
import { toast } from 'react-toastify';
import Loader from "./UI/Loader";

const EditProfileModal = ({ user, onClose }) => {
  const [data, setData] = useState({
    fname: user.fname,
    lname: user.lname
  });
  const [loading, setLoading] = useState(false);

  const handleDataEdit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await UserService.update(user.id, data);
      if (res.status === 200) {
        toast.success('Профиль успешно обновлён');
        onClose();
      } else {
        toast.error(res.data?.message || "Ошибка при обновлении данных пользователя");
      }
    } catch (e) {
      toast.error('Ошибка сервера, повторите попытку позже');
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async () => {
    setLoading(true);
    try {
      const res = await UserService.promote(user.id, "article.write");
      if (res.status === 200) {
        toast.success('Поздравляем! Теперь вы можете написать свою первую статью.');
        onClose();
      } else {
        toast.error(res.data?.message || "Ошибка при обновлении данных пользователя");
      }
    } catch (e) {
      toast.error('Ошибка сервера, повторите попытку позже');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await UserService.verify(user.id);
      if (res.status === 200) {
        toast.success('Аккаунт успешно верифицирован');
        onClose();
      } else {
        toast.error(res.data?.message || "Ошибка верификации аккаунта");
      }
    } catch (e) {
      toast.error('Ошибка сервера, повторите попытку позже');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      {loading ? (<Loader />) : (
        <div className="modal-wrapper">
          <button className="close-button" onClick={onClose} aria-label="Закрыть">
            &times;
          </button>

          <div className="modal">
            <h2>Редактировать профиль</h2>

            <div className="form-group">
              <label>Имя</label>
              <input name="fname" type="text" value={data.fname} onChange={handleDataEdit} />
            </div>

            <div className="form-group">
              <label>Фамилия</label>
              <input name="lname" type="text" value={data.lname} onChange={handleDataEdit} />
            </div>

            {user.role === 'USER' && user.scopes && !user.scopes.includes("article.write") && (
              <button className="author-btn" onClick={handlePromote}>Стать автором</button>
            )}

            {!user.is_verified && (
              <button className="author-btn" onClick={handleVerify}>Верифицировать аккаунт</button>
            )}

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>Сохранить</button>
              <button className="cancel-btn" onClick={onClose}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;
