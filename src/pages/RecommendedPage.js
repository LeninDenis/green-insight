import React, { useEffect } from 'react';
import '../styles/pages/HomePage.css';
import ArticleCard from '../components/ArticleCard';
import {useAuth} from "../context/AuthContext";
import ArticleService from "../api/ArticleService";
import Loader from "../components/UI/Loader";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import { useTranslation } from "react-i18next";
import PaymentService from "../api/PaymentService";

const fetchRecommended = async (logged) => {
    let res = logged
        ? await ArticleService.getRecommendations()
        : await ArticleService.getAllArticles(false, true, null, null, null, null, null, null);
    if(res.status !== 200) {
        let isPaid = false;
        if (logged) {
            const sub = await PaymentService.getActive();
            if (sub.status === 200) isPaid = true;
        }
        res = logged
            ? await ArticleService.getAllArticles(true, true, null, isPaid ? "ALL" : null, null, null, null, null)
            : await ArticleService.getAllArticles(false, true, null, null, null, null, null, null);
        if(res.status !== 200){
            throw new Error(res.data?.message || 'Error loading articles');
        }
    }
    return res.data;
};

const Recommended = () => {
    const { logged } = useAuth();
    const { t } = useTranslation();

    const {data: recommendedArticles, isLoading, error} = useQuery({
        queryKey: ['recommend', logged],
        queryFn: () => fetchRecommended(logged),
        enabled: logged !== null,
        staleTime: Infinity,
        cacheTime: 10 * 60 * 1000,
        retry: 1
    });

    useEffect(() => {
        if(error){
            toast.error(error.message || t('errors.server'));
        }
    }, [error, t]);

    return !recommendedArticles || isLoading ? (<Loader />) : (
        <div className="gi-page">
            <div className="section">
                <h1>{t('recommend.title')}</h1>
                <div className="articles-grid">
                    {recommendedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recommended;
