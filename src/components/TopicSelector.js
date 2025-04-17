import React, { useState, useEffect, useRef } from 'react';
import '../styles/TopicSelector.css';

const TopicSelector = ({ selectedTopics, onChange }) => {
  const [topics, setTopics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const exampleTopics = [
      { id: 'eco_news', name: 'Экологические новости' },
      { id: 'climate_change', name: 'Изменение климата' },
      { id: 'recycling', name: 'Переработка отходов' },
      { id: 'sustainable_living', name: 'Устойчивый образ жизни' },
    ];
    setTopics(exampleTopics);
  }, []);

  const handleSelect = (id) => {
    onChange([id]); // выбор только одной темы
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedTopicName =
    topics.find((topic) => topic.id === selectedTopics[0])?.name || 'Выберите тему';

  return (
    <div className="topic-selector" ref={dropdownRef}>
      <label>Тематика статьи</label>
      <div className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="dropdown-selected">
          {selectedTopicName}
          <span className="arrow">{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="dropdown-option"
                onClick={() => handleSelect(topic.id)}
              >
                {topic.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicSelector;
