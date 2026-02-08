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
    <div>
    <button 
      onClick={toggleTheme}
      className="navbar-right-wrapper navbar-button"
      aria-label={isDark ? "Go light mode" : "Go dark mode"}
      title={isDark ? "Go light mode" : "Go dark mode"}
      style={{
        width: '2.2rem',
      }}
    />

    <img
      className='theme-icon'
      src={themeIcon}
      alt="theme"
    />

    </div>
  );
}

export default ThemeToggle;