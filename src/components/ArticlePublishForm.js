import React, { useState } from 'react';
import TopicSelector from './TopicSelector';
import '../styles/ArticlePublishForm.css';

const ArticlePublishForm = () => {
  const [title, setTitle] = useState('');
  const [topicId, setTopicId] = useState([]);
  const [annotation, setAnnotation] = useState('');
  const [content, setContent] = useState('');

  const canPublishPaid = false; // заглушка

  const handleSubmit = (isPaid) => {
    if (isPaid && !canPublishPaid) {
      alert('Для платной публикации необходимо оформить специальную подписку.');
      return;
    }

    const articleData = {
      title,
      topicId: topicId[0],
      annotation,
      content,
      isPaid
    };

    console.log('Отправка статьи:', articleData);
  };

  return (
    <div className="publish-form">
      <h2>Публикация статьи</h2>

      <label>Название статьи</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите заголовок"
      />

      <TopicSelector selectedTopics={topicId} onChange={(topics) => setTopicId([topics[topics.length - 1]])} />

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
    </div>
  );
};

export default ArticlePublishForm;
