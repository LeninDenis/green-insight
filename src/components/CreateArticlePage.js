import React, { useState } from 'react';
import TopicSelector from '../components/TopicSelector';
import ErrorPopup from '../components/ErrorPopup';
import '../styles/ArticlePublishForm.css';

const CreateArticlePage = () => {
  const [title, setTitle] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [annotation, setAnnotation] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const canPublishPaid = false; // заглушка

  const handleSubmit = (isPaid) => {
    if (isPaid && !canPublishPaid) {
      setError({
        status: 403,
        message: 'Для платной публикации необходима специальная подписка.',
      });
      return;
    }

    const articleData = {
      title,
      topicId: selectedTopics[0],
      annotation,
      content,
      isPaid,
    };

    console.log('Публикация статьи:', articleData);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <div className="publish-form">
      <h2>Создание статьи</h2>

      <label>Название статьи</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите заголовок"
      />

      <TopicSelector selectedTopics={selectedTopics} onChange={setSelectedTopics} />

      <label>Аннотация</label>
      <textarea
        value={annotation}
        onChange={(e) => setAnnotation(e.target.value)}
        placeholder="Краткое описание статьи"
        rows={3}
      />

      <label>Контент статьи</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Основной текст статьи"
        rows={10}
      />

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

      {error && (
        <ErrorPopup
          status={error.status}
          message={error.message}
          onClose={handleErrorClose}
        />
      )}
    </div>
  );
};

export default CreateArticlePage;
