import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import '../styles/RegisterForm.css';
import Loader from "./UI/Loader";
import { useTranslation } from "react-i18next";

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-overlay">
      {loading ? (<Loader />) : (
        <form onSubmit={handleSubmit} className="register-form">
          <button type="button" className="close-btn" onClick={onClose}>&times;</button>
          
          <div className="form-group">
            <label htmlFor="fname">{t("register_form.fname")}</label>
            <input
              type="text"
              name="fname"
              placeholder={t("register_form.fname_placeholder")}
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lname">{t("register_form.lname")}</label>
            <input
              type="text"
              name="lname"
              placeholder={t("register_form.lname_placeholder")}
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t("register_form.email")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("register_form.email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("register_form.password")}</label>
            <input
              type="password"
              name="password"
              placeholder={t("register_form.password_placeholder")}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">{t("register_form.submit")}</button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
