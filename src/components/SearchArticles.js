import React, { useState } from 'react';
import articles from '../data/articlesData';
import '../styles/SearchArticles.css';

const SearchArticles = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setResults([]);
    } else {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <div className="search-articles">
      <input
        type="text"
        placeholder="Search articles by title..."
        value={query}
        onChange={handleSearch}
      />
      <ul className="results-list">
        {results.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchArticles;
