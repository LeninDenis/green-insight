import React, {useState} from 'react';
import '../styles/pages/SubscribePage.css';
import { toast } from 'react-toastify';
import PaymentService from "../api/PaymentService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import Loader from "../components/UI/Loader";

const SubscribePage = () => {
    const navigate = useNavigate();
    const { user, refresh } = useAuth();
    const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const res = await PaymentService.create(1);
        if(res.status === 200){
            toast.success("Вы будете перенаправлены на сервис Stripe для оформления оплаты...");
            window.open(res.data.url, "_blank");
            await refresh();
            navigate(`/user/${user.id}`);
        } else {
            toast.error(res.data.message);
        }
    } catch (e) {
        toast.error('Ошибка сервера, повторите попытку позже');
    } finally {
        setLoading(false);
    }
  };

  return loading ? (<Loader />) : (
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
