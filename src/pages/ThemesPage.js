import React, {useEffect} from 'react';
import '../styles/pages/ThemesPage.css';
import { Link } from 'react-router-dom';
import CategoryService from "../api/CategoryService";
import {toast} from "react-toastify";
import Loader from "../components/UI/Loader";
import {useQuery} from "@tanstack/react-query";

const fetchCategories = async () => {
    const res = await CategoryService.getCategories();
    if (res.status !== 200) {
        throw new Error(res.data?.message || 'Ошибка при загрузке категорий');
    }
    return res.data;
};

const Themes = () => {
    const {data: categories, isLoading, error} = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: Infinity,
        cacheTime: 10 * 60 * 1000,
        retry: 1
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Ошибка сервера, повторите попытку позднее");
        }
    }, [error]);
  return !categories || isLoading ? (<Loader />) : (
    <div className="themes-page">
      <h1>Темы</h1>
      <div className="themes-grid">
        {categories.map((category) => (
          <Link to={`/themes`} key={category.id} className="theme-card-link">
            <div className="theme-card">
              <h3>{category.name}</h3>
              <p>{category.description || ""}</p>
            </div>
          </Link>
        ))}
      </div>
      <button className="suggest-theme-btn">Предложить тему</button>
    </div>
  );
};

export default Themes;
