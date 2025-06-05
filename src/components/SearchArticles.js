import React, { useState } from 'react';
import '../styles/SearchArticles.css';
import {Search, X} from "lucide-react";
import {Link} from "react-router-dom";
import ArticleService from "../api/ArticleService";
import {useAuth} from "../context/AuthContext";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const SearchArticles = () => {
    const {logged} = useAuth();
    const {t} = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [showRes, setShowRes] = useState(false);
    const [articles, setArticles] = useState([]);

    const handleSearch = async () => {
        try{
            const res = await ArticleService.search(logged, searchQuery);
            if(res.status === 200){
                setArticles(res.data);
                setShowRes(true);
            } else {
                toast.error(t('errors.server'));
            }
        } catch (e){
            toast.error(e.message || t('errors.server'));
        }
    }

    return (
        <div className="search">
            <div className="search-inner">
                <Search className="search-btn" onClick={() => handleSearch()}/>
                <input
                    type="text"
                    placeholder="Поиск статей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            {showRes && (
                <div className="search-res">
                    <ul className="search-articles">
                        {articles?.length > 0 ? (
                            articles.map((article) => (
                                <li key={article.id}>
                                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                                </li>
                            ))
                        ) : (
                            <p>Ничего не найдено...</p>
                        )}
                    </ul>
                    <X className="search-cross" onClick={() => setShowRes(false)}/>
                </div>
            )}
        </div>
    );
};

export default SearchArticles;
