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

const fetchData = async (category, logged) => {
    let isPaid = false;
    if (logged) {
        const sub = await PaymentService.getActive();
        if (sub.status === 200) isPaid = true;
    }
    const [articlesResp, categoriesResp] = await Promise.all([
        logged
            ? ArticleService.getAllArticles(true, true, null, isPaid ? "PAID" : null, null, category ? category.id : null, null, null)
            : ArticleService.getAllArticles(false, true, null, null, null, category ? category.id : null, null, null),
        CategoryService.getCategories()
    ]);

    if (articlesResp.status !== 200) {
        throw new Error(articlesResp.data?.message || "Ошибка при загрузке статей");
    }

    if (categoriesResp.status !== 200) {
        throw new Error(categoriesResp.data?.message || "Ошибка при загрузке категорий");
    }

    return {
        articles: articlesResp.data,
        categories: categoriesResp.data
    };
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [catFilter, setCatFilter] = useState(null);
  const { logged } = useAuth();
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
          toast.error(error.message || "Ошибка сервера, повторите позднее");
      }
  }, [error]);

  return (
    <div className="gi-page">
      <h1>Главная страница</h1>
      
      {/*<input*/}
      {/*  type="text"*/}
      {/*  placeholder="Поиск статей..."*/}
      {/*  value={searchQuery}*/}
      {/*  onChange={(e) => setSearchQuery(e.target.value)}*/}
      {/*  className="search-input"*/}
      {/*/>*/}

        {isLoading || logged === null ? (<Loader />) : (
            <>
                <div className="selector-inner">
                    <Selector
                        title={"Фильтр по категориям"}
                        defaultValue="Все категории"
                        options={data.categories}
                        value={catFilter}
                        onChange={setCatFilter}
                    />
                </div>
                <div className="section">
                    <div className="articles-grid">
                        {data.articles.map((article) => (
                            <ArticleCard key={article.id} article={article}/>
                        ))}
                    </div>
                </div>
            </>
        )}
    </div>
  );
};

export default HomePage;
