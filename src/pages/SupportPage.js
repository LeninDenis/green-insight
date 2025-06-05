import React from 'react';
import '../styles/pages/SupportPage.css';
import { useTranslation } from 'react-i18next';

const SupportPage = () => {
  const { t } = useTranslation();

  return (
    <div className="support-page">
      <h1>{t('support_page.title')}</h1>
      <p>{t('support_page.intro')}</p>
      <p>{t('support_page.email')} <strong>support@greeninsight.com</strong></p>
      <p>{t('support_page.form')}</p>
      <h2>{t('support_page.faqTitle')}</h2>
      <ul>
        <li>{t('support_page.faq1')}</li>
        <li>{t('support_page.faq2')}</li>
        <li>{t('support_page.faq3')}</li>
        <li>{t('support_page.faq4')}</li>
      </ul>
    </div>
  );
};

export default SupportPage;
