// src/components/CardsGrid.jsx
import React, { useRef } from 'react';
import Cards from './Cards';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { useGridLayout } from '../../hooks/useGridLayout';

const CardsGrid = ({ videos, selectedTagColor, onTagClick, noAdsEnabled}) => {
  const containerRef = useRef(null);
  const gridContainerRef = useRef(null);
  
  const CARD_LENGTH = 200;
  const GAP = 22;

  // Hooks appelés systématiquement (règle des hooks React)
  const { gridWidth } = useGridLayout(containerRef, videos, CARD_LENGTH, GAP);
  useHorizontalScroll(gridContainerRef, selectedTagColor);


  if (!videos || videos.length === 0) {
    return (
      <div
        className="no-result"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          src="public\no_results\no-results.webp"
          alt="No results"
          style={{maxWidth: '200px'}}
        />
      </div>
    );
  }

  return (
    <div 
      ref={gridContainerRef}
      className="cards-grid-container"
      style={{
        width: `${gridWidth}px`,
        height: '100%',
        minHeight: '100%'
      }}
    >
      <div 
        ref={containerRef}
        className="cards-grids"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateRows: `repeat(auto-fill, ${CARD_LENGTH}px)`,
          gridAutoColumns: `${CARD_LENGTH}px`,
          gap: `${GAP}px ${GAP}px`,
          height: '100%'
        }}
      >
        {videos.map(video => (
          <Cards 
            key={video.id} 
            video={video}
            selectedTagColor={selectedTagColor}
            onTagClick={onTagClick}
            cardLength={CARD_LENGTH}
            noAdsEnabled={noAdsEnabled}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;