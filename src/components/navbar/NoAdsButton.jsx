import React from 'react';

function NoAdsButton( {noAdsEnabled, setNoAdsEnabled}) {
    return (
        <div className="navbar-right-wrapper tooltip-wrapper">
            <button className={`navbar-button no-ads ${!noAdsEnabled ? 'active' : ''}`}>
                {noAdsEnabled ? "No Ads" : "Ads"}
            </button>
            
            <div className="tooltip-content">
                <p>Tweaks the youtube url to remove ads</p>
                <button 
                    className="toggle-ads-btn"
                    onClick={() => setNoAdsEnabled(!noAdsEnabled)}
                    style={{
                        backgroundColor: noAdsEnabled ? 'var(--selected-tag-color)' : 'var(--selected-tag-color-dark)',
                        boxShadow: noAdsEnabled ? '0 0 15px var(--selected-tag-color)' : 'none',
            }}
                >
                    {noAdsEnabled ? "Enabled" : "Disabled"}
                </button>
            </div>
        </div>
    );
}

export default NoAdsButton;