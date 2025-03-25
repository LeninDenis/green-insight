import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import '../styles/RegisterForm.css';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!register) {
      console.error("Ошибка: register не определён в useAuth()");
      return;
    }

    try {
      await register(formData);
      console.log("Пользователь зарегистрирован:", formData);
      onClose();
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <div className="register-form-overlay">
      <form onSubmit={handleSubmit} className="register-form">
        <button type="button" className="close-btn" onClick={onClose}>&times;</button>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Введите ваше имя" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Введите ваш email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Введите ваш пароль" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterForm;