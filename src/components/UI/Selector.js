import React, { useState, useEffect, useRef } from 'react';
import '../../styles/UI/Selector.css';

const Selector = ({ options, defaultValue, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const selectedTopicName = value ? options.find((option) => option.id === value.id)?.name || defaultValue : defaultValue;

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
            {options.map((option) => (
              <div
                key={option.id}
                className="dropdown-option"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Selector;
