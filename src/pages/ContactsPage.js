import React, { useState } from 'react';
import '../styles/pages/ContactsPage.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // логика отправки формы
  };

  return (
    <div className="contacts-page">
      <h1>Контакты</h1>
      <p>Если у вас есть вопросы или предложения, свяжитесь с нами через форму ниже:</p>

      <form onSubmit={handleSubmit} className="contacts-form">
        <div className="form-group">
          <label htmlFor="name">Ваше имя</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Введите ваше имя"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Ваш email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Введите ваш email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Сообщение</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Введите ваше сообщение"
          />
        </div>

        <button type="submit" className="submit-btn">Отправить</button>
      </form>

      <div className="contact-info">
        <p><strong>Адрес:</strong> ул. Жарокова, 123, офис 45, Алматы</p>
        <p><strong>Телефон:</strong> +7 777 123 45 67</p>
        <p><strong>Email:</strong> contact@greeninsight.kz</p>
        <p><strong>Support Email:</strong> support@greeninsight.com</p>
      </div>
    </div>
  );
};

export default Contacts;
