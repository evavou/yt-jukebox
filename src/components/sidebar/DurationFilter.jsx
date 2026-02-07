// src/components/DurationFilter.jsx
import React, { useState, useEffect, useRef } from 'react';
import './DurationFilter.css'

function DurationFilter({ videos, onDurationChange }) {
  const allDurations = videos.map(v => v.hours * 60 + v.minutes);
  const maxDuration = 480;
  
  const [minDuration, setMinDuration] = useState(0);
  const [maxDurationState, setMaxDurationState] = useState(maxDuration);
  const [isDragging, setIsDragging] = useState(null);
  const containerRef = useRef(null);

  const formatDuration = (minutes) => {
    if (minutes <= 0) return "0 min";
    if (minutes >= maxDuration) return "24h";
    
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 9 ? `${hours}h${mins}` : `${hours}h0${mins}`;
    }
  };

  // Bornes strictes (Clamping)
  const positionToValue = (y) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = y - rect.top;
    
    // On force le pourcentage entre 0 et 1 pour éviter que ça sorte de la barre
    const percentage = Math.min(Math.max(1 - (relativeY / rect.height), 0), 1);
    return Math.round(percentage * maxDuration);
  };

  const handleMouseDown = (e, type) => {
    e.preventDefault();
    e.stopPropagation(); // Empêche le clic de se propager à la piste
    setIsDragging(type);
  };

  // --- CORRECTION 2 : Logique de clic sur la piste ---
  const handleTrackMouseDown = (e) => {
    const value = positionToValue(e.clientY);
    // On déplace le curseur le plus proche de l'endroit cliqué
    const distMin = Math.abs(value - minDuration);
    const distMax = Math.abs(value - maxDurationState);
    
    if (distMin < distMax) {
      setMinDuration(Math.min(value, maxDurationState - 1));
      setIsDragging('min');
    } else {
      setMaxDurationState(Math.max(value, minDuration + 1));
      setIsDragging('max');
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const value = positionToValue(e.clientY);
    const buffer = 1; // Marge minimale d'une minute entre les deux

    if (isDragging === 'min') {
      // Le min ne peut pas dépasser le max - buffer
      setMinDuration(Math.min(value, maxDurationState - buffer));
    } else if (isDragging === 'max') {
      // Le max ne peut pas descendre en dessous du min + buffer
      setMaxDurationState(Math.max(value, minDuration + buffer));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    onDurationChange({ min: minDuration, max: maxDurationState });
  }, [minDuration, maxDurationState, onDurationChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, minDuration, maxDurationState]);

  const minPosition = (minDuration / maxDuration) * 100;
  const maxPosition = (maxDurationState / maxDuration) * 100;




  return (
    <div className="duration-filter-container">

      {/*TOP TIME BUTTON*/}
      <button
        key={maxDurationState}
        className={'time-button'}
        onClick={() => setMaxDurationState(480)}
        aria-pressed={maxDurationState}
      >
        {formatDuration(maxDurationState)}
      </button>

      <div 
        ref={containerRef}
        className="slider-track"
        onMouseDown={handleTrackMouseDown} // Clic intelligent sur la piste
      >
        <div className="track-background"></div>
        
        <div 
          className="selected-range"
          style={{
            bottom: `${minPosition}%`,
            top: `${100 - maxPosition}%`
          }}
        ></div>
        
        {/* Curseur MIN */}
        <div 
          className={`slider-thumb min-thumb ${isDragging === 'min' ? 'active' : ''}`}
          style={{ bottom: `${minPosition}%`, transform: 'translate(-50%, 50%)' }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
        >
          <div className="thumb-label">{formatDuration(minDuration)}</div>
        </div>
        
        {/* Curseur MAX */}
        <div 
          className={`slider-thumb max-thumb ${isDragging === 'max' ? 'active' : ''}`}
          style={{ bottom: `${maxPosition}%`, transform: 'translate(-50%, 50%)' }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
        >
          <div className="thumb-label">{formatDuration(maxDurationState)}</div>
        </div>
      </div>

      {/*BOTTOM TIME BUTTON*/}
      <button
        key={minDuration}
        className={'time-button'}
        onClick={() => setMinDuration(0)}
        aria-pressed={minDuration}
      >
        {formatDuration(minDuration)}
      </button>
    </div>
  );
}

export default DurationFilter;