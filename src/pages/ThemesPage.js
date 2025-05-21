import React, {useState, useEffect} from 'react';
import '../styles/pages/ThemesPage.css';
import { Link } from 'react-router-dom';
import CategoryService from "../api/CategoryService";
import {toast} from "react-toastify";
import Loader from "../components/UI/Loader";

const Themes = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchCategories = async() => {
        setLoading(true);
        try{
            const res = await CategoryService.getCategories();
            if(res.status === 200){
                setCategories(res.data);
            } else {
                toast.error("Ошибка при выполнении запроса");
                console.log(res.status+": "+res.data.message);
            }
        } catch (e){
            toast.error("Ошибка сервера, повторите попытку позднее");
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);
  return !categories || loading ? (<Loader />) : (
    <div className="themes-page">
      <h1>Темы</h1>
      <div className="themes-grid">
        {categories.map((category) => (
          <Link to={`/themes`} className="theme-card-link">
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
