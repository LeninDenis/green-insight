import React from 'react';
import '../styles/CategoryCard.css';

function CategoryCard({ image, title, description, link }) {
  return (
    <div className="category-card">
      <img src={image} alt={title} className="category-image" />
      <div className="category-content">
        <h3 className="category-title">{title}</h3>
        <p className="category-description">{description}</p>
        <a href={link} className="category-link">Узнать больше</a>
      </div>
    </div>
  );
}

export default CategoryCard;
