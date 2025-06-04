import React, { useEffect, useState } from 'react';
import '../styles/pages/CreateArticlePage.css';
import Selector from "../components/UI/Selector";
import CategoryService from "../api/CategoryService";
import Loader from "../components/UI/Loader";
import MDEditor from "@uiw/react-md-editor";
import ArticleService from "../api/ArticleService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const CreateArticlePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const canPublishPaid = user?.role === "AUTHOR" || user?.role === "ADMIN";

  const fetchData = async () => {
    try {
      const cats = await CategoryService.getCategories();
      if (cats.status === 200) {
        setCategories(cats.data);
      } else {
        toast.error(cats.data.message || t('create.error_loading_categories'));
      }
    } catch (e) {
      toast.error(t('common.unknown_error'));
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
        toast.warn(t('create.paid_publish_warning'));
      } else {
        let paid = canPublishPaid ? isPaid ? "PAID" : "FREE" : "FREE";
        if (!choose) {
          toast.error(t('create.error_choose_category'));
        } else {
          const newArticle = {
            ...articleForm,
            category: choose.id,
            content: content,
            paidStatus: paid
          };
          const response = await ArticleService.create(newArticle);
          if (response.status === 201) {
            toast.success(t('create.success'));
            navigate("/");
          } else {
            toast.error(response.data.message || t('create.error_publishing'));
          }
        }
      }
    } catch (e) {
      toast.error(t('common.unknown_error'));
    }
  };

  return loading ? (<Loader />) : (
    <div className="publish-form">
      <h2>{t('create.title')}</h2>

      <label>{t('create.article_title')}</label>
      <input
        type="text"
        value={articleForm.title}
        onChange={(e) => handleForm('title', e.target.value)}
        placeholder={t('create.article_title_placeholder')}
      />

      <Selector
        title={t('create.category')}
        options={categories}
        defaultValue={t('create.all_categories')}
        value={choose}
        onChange={setChoose}
      />

      <label>{t('create.annotation')}</label>
      <textarea
        className='annotation-text'
        value={articleForm.annotation}
        onChange={(e) => handleForm('annotation', e.target.value)}
        placeholder={t('create.annotation_placeholder')}
        rows={3}
      />

      <label>{t('create.content')}</label>
      <MDEditor value={content} onChange={setContent} />

      <div className="publish-buttons">
        <button onClick={() => handleSubmit(false)}>
          {t('create.publish')}
        </button>
        <button
          className="paid"
          onClick={() => handleSubmit(true)}
          disabled={!canPublishPaid}
          title={!canPublishPaid ? t('create.subscription_required') : ''}
        >
          {t('create.paid_publish')}
        </button>
      </div>
    </div>
  );
};

export default CreateArticlePage;
