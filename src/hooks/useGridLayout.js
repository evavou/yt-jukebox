// src/hooks/useGridLayout.js
import { useState, useEffect } from 'react';

export const useGridLayout = (containerRef, videos, cardLength = 200, gap = 20) => {
  const [columns, setColumns] = useState(1);

  // Calculer le nombre de colonnes
  useEffect(() => {
    const calculateColumns = () => {
      if (!containerRef?.current) return;
      
      const containerHeight = containerRef.current.clientHeight;
      const cardsPerColumn = Math.floor(containerHeight / (cardLength + gap));
      
      if (cardsPerColumn > 0) {
        const neededColumns = Math.ceil(videos.length / cardsPerColumn);
        setColumns(Math.max(1, neededColumns));
      }
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [videos.length, containerRef, cardLength, gap]);

  const gridWidth = columns * (cardLength + gap);

  return { columns, gridWidth };
};