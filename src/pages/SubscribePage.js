import React from 'react';
import '../styles/pages/SubscribePage.css';

const SubscribePage = () => {
  return (
    <div className="subscribe-page">
      <h2>Платная подписка</h2>
      <p>Оформите подписку всего за <strong>$3.99</strong> и получите доступ к дополнительным материалам.</p>

      <form className="payment-form">
        <label htmlFor="card">Введите данные карты:</label>
        <input type="text" id="card" placeholder="1234 5678 9012 3456" />

        <p>Или оплатите по QR-коду:</p>
        <div className="qr-code-placeholder">
          {/* затычка для QR */}
          <div className="fake-qr">QR</div>
        </div>

        <button type="submit" className="subscribe-btn">
          Оформить подписку
        </button>
      </form>
    </div>
  );
};

export default SubscribePage;
