import React from 'react';
import "../styles/components/SubscriptionCard.css";
import PaymentService from "../api/PaymentService";
import {toast} from "react-toastify";

const SubscriptionCard = ({subscription, id, userId}) => {
    const formatDate = (dateStr) =>
        new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateStr));

    const handleAction = async (e, action) => {
        e.preventDefault();
        try{
            let res = action === "cancel"
                ? await PaymentService.cancel()
                : action === "refund"
                    ? await PaymentService.refund()
                    : await PaymentService.resume();
            if(res.status === 204){
                toast.success("Успех!")
                window.location.reload();
            } else {
                toast.error(res.data.message);
            }
        } catch (e) {
            toast.error("Ошибка сервера, повторите попытку позднее");
        }
    }

    const hasTwoDaysPassed = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays <= 2;
    }

    return(
        <div className="subcard">
            <p className="subcard-name">
                <span>Подписка: </span>
                <span>Green-Insight Standard</span>
            </p>
            <p className="subcard-provider">
                <span>Способ оплаты: </span>
                <span>{subscription.provider}</span>
            </p>
            <p className="subcard-status">
                {subscription.status}
            </p>
            <div className="subcard-dates">
                <p>{formatDate(subscription.startDate)}</p>
                <p>-</p>
                <p>{formatDate(subscription.endDate)}</p>
            </div>
            {userId === id && (
                <div className="subcard-actions">
                    {subscription.status === "ACTIVE" && (
                        <button onClick={(e) => handleAction(e, "cancel")}>Отменить подписку</button>
                    )}
                    {subscription.status === "ACTIVE"
                        && hasTwoDaysPassed(subscription.startDate)
                        && (
                        <button onClick={(e) => handleAction(e, "refund")}>Оформить возврат</button>
                    )}
                    {subscription.status === "CANCEL_AWAITING" && (
                        <button onClick={(e) => handleAction(e, "resume")}>Возобновить подписку</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default SubscriptionCard;