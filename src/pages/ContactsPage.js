import React, { useState } from 'react';
import '../styles/pages/ContactsPage.css';
import { useTranslation } from 'react-i18next';

const Contacts = () => {
  const { t } = useTranslation();

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
      <h1>{t('contacts_page.title')}</h1>
      <p>{t('contacts_page.subtitle')}</p>

      <form onSubmit={handleSubmit} className="contacts-form">
        <div className="form-group">
          <label htmlFor="name">{t('contacts_page.nameLabel')}</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t('contacts_page.namePlaceholder')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">{t('contacts_page.emailLabel')}</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t('contacts_page.emailPlaceholder')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">{t('contacts_page.messageLabel')}</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder={t('contacts_page.messagePlaceholder')}
          />
        </div>

        <button type="submit" className="submit-btn">{t('contacts_page.submit')}</button>
      </form>

      <div className="contact-info">
        <p><strong>{t('contacts_page.addressLabel')}:</strong> {t('contacts_page.address')}</p>
        <p><strong>{t('contacts_page.phoneLabel')}:</strong> +7 777 123 45 67</p>
        <p><strong>Email:</strong> contact@greeninsight.kz</p>
        <p><strong>Support Email:</strong> support@greeninsight.com</p>
      </div>
    </div>
  );
};

export default Contacts;
