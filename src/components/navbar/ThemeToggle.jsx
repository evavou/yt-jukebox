// src/components/ThemeToggle.jsx
import React from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsDark(!isDark);
  };

  const themeIcon = isDark ? "icons/moon.webp" : "icons/sun.webp";

  return (
    <button 
      onClick={toggleTheme}
      className="navbar-button-wrapper navbar-button"
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      style={{
        width: '2.2rem',
      }}
    >
      
      <img
          src={themeIcon}
          alt="theme"
          style={{
              display: 'inline-flex',
              boxSizing: 'border-box',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '15px',
              marginTop: '-1px',
              marginLeft: isDark ? '1px' : '1px'
          }}
        />
    </button>
  );
}

export default ThemeToggle;