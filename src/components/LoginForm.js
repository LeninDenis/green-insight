import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import '../styles/LoginForm.css';
import Loader from "./UI/Loader";

const LoginForm = ({ onClose }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await login(credentials);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-overlay">
      {loading ? (<Loader />) : (
          <form onSubmit={handleSubmit} className="login-form">
            <button type="button" className="close-btn" onClick={onClose}>&times;</button>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={credentials.email} placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input type="password" name="password" value={credentials.password} placeholder="Пароль" onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-btn">Войти</button>
          </form>
      )}
    </div>
  );
};

export default LoginForm;
