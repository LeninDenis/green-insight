import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import '../styles/LoginForm.css';
import { toast } from 'react-toastify';

const LoginForm = ({ onClose }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      toast.success("Вы успешно вошли в аккаунт");
      window.location.reload();
    } catch (error) {
      toast.error("Ошибка входа. Проверьте email и пароль.");
    }
  };

  return (
    <div className="login-form-overlay">
      <form onSubmit={handleSubmit} className="login-form">
        <button type="button" className="close-btn" onClick={onClose}>&times;</button>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
