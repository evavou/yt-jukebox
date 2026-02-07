// src/components/TagFilter.jsx
import React, { useState } from 'react';
import { getTagColor, getLightTagColor, getDarkTagColor } from '../../styles/colors.js';
import './TagFilter.css';

const TagFilter = ({ allTags, selectedTag, onTagChange }) => {
  const [isPainting, setIsPainting] = useState(false);

  const handleMouseDown = (tag) => {
    setIsPainting(true);
    onTagChange(tag);
  };

  const handleMouseEnter = (tag) => {
    if (isPainting) {
      onTagChange(tag);
    }
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  return (
    <div 
      className="tag-filter-container"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      {allTags.map((tag) => {
        const isSelected = selectedTag === tag;
        const color = getTagColor(tag);
        const darkColor = getDarkTagColor(color);
        const lightColor = getLightTagColor(color);

        return (
          <button
            key={tag}
            className={`tag-button ${isSelected ? 'selected' : ''}`}
            style={{
              backgroundColor: (isSelected ? color : darkColor),
              color: lightColor,
              boxShadow: isSelected ? `0 0 15px ${color}` : 'none',
            }}
            onMouseDown={() => handleMouseDown(tag)}
            onMouseEnter={() => handleMouseEnter(tag)}
            onClick={() => onTagChange(tag)}
            aria-pressed={isSelected}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};

export default TagFilter;