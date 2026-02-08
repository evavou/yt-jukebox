// src/components/Navbar.jsx
import React from 'react'; 
import './Navbar.css'
import ThemeToggle from './ThemeToggle';
import NoAdsButton from './NoAdsButton';
import RandomVideoButton from './RandomVideoButton';
import AboutButton from './AboutButton';

function Navbar({
    searchQuery,
    onSearchChange,
    videoCount,
    noAdsEnabled,
    setNoAdsEnabled,
    hiddenSidebar,
    setHiddenSidebar,
    videos
}) {

    const handleClick = () => {
        setHiddenSidebar(!hiddenSidebar);
    };


  return (
    <nav className="navbar noise">

        {/* --- GROUPE GAUCHE --- */}
        <div className="navbar-left-wrapper">
            {/* SIDEBAR TOGGLE */}
            <button
                className={'sidebar-toggle navbar-button navbar-left-wrapper'}
                onClick={handleClick}
            >
                ☰
            </button>

      

            {/* SEARCH BAR */}
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search videos"
                />
                {searchQuery && (
                    <button
                        className="clear-search-btn"
                        onClick={() => onSearchChange('')}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>

            {/* RANDOM BUTTON */}
            <RandomVideoButton 
                videos={videos}
                noAdsEnabled={noAdsEnabled}
            />

            <div className="video-count">
                videos : {videoCount}
            </div>
        </div>
        


        {/* --- GROUPE DROITE --- */}
        <div className="navbar-right-wrapper">
            {/* THEME TOGGLE */}
            <ThemeToggle/>

            {/* NOS ADS BUTTON */}
            <NoAdsButton
                noAdsEnabled={noAdsEnabled}
                setNoAdsEnabled={setNoAdsEnabled}
            />


            {/* ABOUT */}
        <AboutButton/>
        </div>
    </nav>
  );
}

export default Navbar;