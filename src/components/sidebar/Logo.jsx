// src/components/Logo.jsx
import React, { useState, useEffect } from 'react';

function Logo({ selectedTag }) {
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const tagName = selectedTag || 'all';
  
  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    };

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Précharger l'image
  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = `/logo/logo_right_text_small_${theme}_${tagName}.webp`;
    img.onload = () => setIsLoaded(true);
  }, [theme, tagName]);

  return (
    <div className="logo-container">
      <img
        src={`/logo/logo_right_text_small_${theme}_${tagName}.webp`}
        alt="le logo principal" 
        style={{ 
          width: '85%',
          opacity: isLoaded ? 1 : 0.7,
          transition: 'opacity 0.2s ease'
        }}
        onError={(e) => {
          e.target.src = `/logo/logo_right_text_small_${theme}_all.webp`;
        }}
      />
    </div>
  );
}

export default Logo;