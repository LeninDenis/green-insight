import React from 'react';
import '../styles/pages/SubscribePage.css';
import { toast } from 'react-toastify';

const SubscribePage = () => {
  const handlePayment = (e) => {
    e.preventDefault();
    toast.success('Оплата прошла успешно. Спасибо за подписку!');
  };

  return (
    <div className="subscribe-page">
      <h2>Платная подписка</h2>
      <p>Оформите подписку и получите доступ к дополнительным материалам.</p>

      <form className="payment-form" onSubmit={handlePayment}>
        <div className="subscription-info">
          <p><strong>Подписка:</strong> Общая</p>
          <p><strong>Стоимость:</strong> $3.99</p>
        </div>

        <button type="submit" className="subscribe-btn">
          Оплатить
        </button>
      </form>
    </div>
  );
};

export default SubscribePage;
