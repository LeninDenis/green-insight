import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import '../styles/RegisterForm.css';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("Registration initiated");
    e.preventDefault();
    await register(formData);
    window.location.reload();
  };

  return (
    <div className="register-form-overlay">
      <form onSubmit={handleSubmit} className="register-form">
        <button type="button" className="close-btn" onClick={onClose}>&times;</button>
        <div className="form-group">
          <label htmlFor="fname">Имя</label>
          <input 
            type="text" 
            name="fname"
            placeholder="Введите ваше имя" 
            value={formData.fname}
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Фамилия</label>
          <input
              type="text"
              name="lname"
              placeholder="Введите вашу фамилию"
              value={formData.lname}
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