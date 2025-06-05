import React, {useEffect, useState} from 'react';
import '../styles/pages/HomePage.css';
import ArticleCard from "../components/ArticleCard";
import CategoryService from "../api/CategoryService";
import ArticleService from "../api/ArticleService";
import Loader from "../components/UI/Loader";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import Selector from "../components/UI/Selector";
import {useAuth} from "../context/AuthContext";
import PaymentService from "../api/PaymentService";
import {useTranslation} from "react-i18next";
import SearchArticles from "../components/SearchArticles";

const fetchData = async (category, logged) => {
    let isPaid = false;
    if (logged) {
        const sub = await PaymentService.getActive();
        if (sub.status === 200) isPaid = true;
    }
    let [articlesResp, paidArticlesResp, categoriesResp] = await Promise.all([
        logged
            ? ArticleService.getAllArticles(true, true, null, isPaid ? "ALL" : null, null, category ? category.id : null, isPaid ? 1 : null, isPaid ? 6 : null)
            : ArticleService.getAllArticles(false, true, null, null, null, category ? category.id : null, null, null),
        logged && isPaid
            ? ArticleService.getAllArticles(true, true, null, "PAID", null, null, null, null)
            : {status: 403, data: []},
        CategoryService.getCategories()
    ]);

    if(paidArticlesResp.status !== 200){
        paidArticlesResp = {data: []};
    }

    if (articlesResp.status !== 200) {
        throw new Error(articlesResp.data?.message || "Error loading articles");
    }

    if (categoriesResp.status !== 200) {
        throw new Error(categoriesResp.data?.message || "Error loading categories");
    }

    return {
        articles: articlesResp.data,
        paidArticles: paidArticlesResp.data,
        categories: categoriesResp.data
    };
};

const HomePage = () => {
    const [catFilter, setCatFilter] = useState(null);
    const { logged } = useAuth();
    const { t } = useTranslation();

    const {data, isLoading, error} = useQuery({
        queryKey: ['articles-n-categories', catFilter],
        queryFn: () => fetchData(catFilter, logged),
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

    return (
        <div className="gi-page">
            <SearchArticles />
            {isLoading || logged === null ? (<Loader />) : (
                <>
                    <div className="section">
                        <h1>{t('homepage.title')}</h1>
                        <div className="selector-inner">
                            <Selector
                                title={t('homepage.filter')}
                                defaultValue={t('homepage.all_categories')}
                                options={data.categories}
                                value={catFilter}
                                onChange={setCatFilter}
                            />
                        </div>
                        <div className="articles-grid">
                            {data.articles.map((article) => (
                                <ArticleCard key={article.id} article={article}/>
                            ))}
                        </div>
                    </div>
                    {data.paidArticles?.length > 0 && (
                        <div className="section">
                            <h1>Статьи по подписке</h1>
                            <div className="articles-grid">
                                {data.paidArticles.map((article) => (
                                    <ArticleCard key={article.id} article={article}/>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
