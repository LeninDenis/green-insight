import React from 'react';
import '../styles/AuthModal.css';

function AuthModal({ isOpen, onClose, isRegister }) {
  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
        <form>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" placeholder="Введите ваше имя" />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Введите ваш email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" placeholder="Введите ваш пароль" />
          </div>
          <button type="submit" className="submit-btn">
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
