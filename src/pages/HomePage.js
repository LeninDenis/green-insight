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
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

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

    if (isLoading || logged === null) {
        return <Loader />;
    }

    const totalPages = Math.ceil(data.articles.length / articlesPerPage);
    const paginatedArticles = data.articles.slice(
        (currentPage - 1) * articlesPerPage,
        currentPage * articlesPerPage
    );

    return (
        <div className="gi-page">
            <SearchArticles />
            <div className="section">
                <h1>{t('homepage.title')}</h1>
                <div className="selector-inner">
                    <Selector
                        title={t('homepage.filter')}
                        defaultValue={t('homepage.all_categories')}
                        options={data.categories}
                        value={catFilter}
                        onChange={(val) => {
                            setCatFilter(val);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="articles-grid">
                    {paginatedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            {t('pagination.prev')}
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            {t('pagination.next')}
                        </button>
                    </div>
                )}
            </div>
            {data.paidArticles?.length > 0 && (
                <div className="section">
                    <h1>{t('homepage.paid_articles')}</h1>
                    <div className="articles-grid">
                        {data.paidArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
