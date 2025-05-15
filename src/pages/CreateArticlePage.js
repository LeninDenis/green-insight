import React, { useEffect, useState } from 'react';
import '../styles/pages/CreateArticlePage.css';
import Selector from "../components/UI/Selector";
import CategoryService from "../api/CategoryService";
import Loader from "../components/UI/Loader";
import MDEditor from "@uiw/react-md-editor";
import ArticleService from "../api/ArticleService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: '',
    annotation: '',
    content: ''
  });
  const [categories, setCategories] = useState([]);
  const [choose, setChoose] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const canPublishPaid = false;

  const fetchData = async () => {
    try {
      const cats = await CategoryService.getCategories();
      if (cats.status === 200) {
        setCategories(cats.data);
      } else {
        toast.error(cats.data.message || 'Ошибка загрузки категорий');
      }
    } catch (e) {
      toast.error('Неизвестная ошибка...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleForm = (type, value) => {
    setArticleForm({
      ...articleForm,
      [type]: value
    });
  };

  const handleSubmit = async (isPaid) => {
    try {
      if (isPaid && !canPublishPaid) {
        toast.warn('Для платной публикации необходима специальная подписка.');
      } else {
        if (!choose) {
          toast.error('Необходимо выбрать тему!');
        } else {
          const newArticle = {
            ...articleForm,
            category: choose.id,
            content: content
          };
          const response = await ArticleService.create(newArticle);
          if (response.status === 201) {
            toast.success('Статья успешно опубликована');
            navigate("/");
          } else {
            toast.error(response.data.message || 'Ошибка публикации статьи');
          }
        }
      }
    } catch (e) {
      toast.error('Неизвестная ошибка...');
    }
  };

  return loading ? (<Loader />) : (
    <div className="publish-form">
      <h2>Создание статьи</h2>

      <label>Название статьи</label>
      <input
        type="text"
        value={articleForm.title}
        onChange={(e) => handleForm('title', e.target.value)}
        placeholder="Введите заголовок"
      />

      <Selector options={categories} defaultValue={'Выберите тему'} value={choose} onChange={setChoose} />

      <label>Аннотация</label>
      <textarea className='annotation-text'
        value={articleForm.annotation}
        onChange={(e) => handleForm('annotation', e.target.value)}
        placeholder="Краткое описание статьи"
        rows={3}
      />

      <label>Контент статьи</label>
      <MDEditor value={content} onChange={setContent} />

      <div className="publish-buttons">
        <button onClick={() => handleSubmit(false)}>Публикация</button>
        <button
          className="paid"
          onClick={() => handleSubmit(true)}
          disabled={!canPublishPaid}
          title={!canPublishPaid ? 'Недоступно без подписки' : ''}
        >
          Платная публикация
        </button>
      </div>
    </div>
  );
};

export default CreateArticlePage;
