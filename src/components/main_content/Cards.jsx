// src/components/VideoCard.jsx
import React from 'react';
import { getTagColor, getLightTagColor, getDarkTagColor } from '../../styles/colors.js';
import './Cards.css'

const Cards = ({ video, selectedTagColor, onTagClick, cardLength, noAdsEnabled}) => {
  const noAds = noAdsEnabled ? '.' : '';

  const video_url = `https://www.youtube.com${noAds}/watch?v=${video.id}&t=0s`;

  const video_thumbnail  ='https://img.youtube.com/vi/'+video.id+'/hqdefault.jpg'

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 9 ? `${hours}h${mins}` : `${hours}h0${mins}`;
    }
  };

  const video_time = formatDuration(video.hours*60 + video.minutes);

  return (
    <div
      className="card h-100 shadow-sm rounded-5"
      style={{
        width: `${cardLength}px`,
        height: `${cardLength}px`,
        backgroundColor: selectedTagColor,
        borderColor: selectedTagColor,
        outline: `4px solid ${selectedTagColor}`,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <a 
        href={video_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-decoration-none text-reset position-relative d-block"
        aria-label={`Regarder ${video.title}`}
      >
      {/* Image comme fond SVG */}
      <svg
        className="card-img rounded-5"
        height="200"
        width="100%"
        viewBox="0 0 200 112"
        role="img"
        preserveAspectRatio="xMidYMid slice"
      >
          <image 
          href={video_thumbnail} 
          width="100%" 
          height="100%" 
          preserveAspectRatio="xMidYMid slice"
          />
      </svg>

      {/* Overlay avec dégradé CSS */}
      <div className="video-shadow"/>
      
      {/* Titre */}
      <div className="video-title">
        {video.title}
      </div>

      {/* Video Info */}
      <div className="video-info">
        {`${video.channel} | ${video_time}`}
      </div>
    </a>

    {/* Tags */}
    <div className="position-absolute bottom-0 start-0 end-0 p-2 ps-3">
      <div className="badge-container">
        {video.tags.map((tag, index) => {
          const color = getTagColor(tag);
          const lightColor = getLightTagColor(color);
          const darkColor = getDarkTagColor(color);
          return (
            <span
              key={index}
              className="badge rounded-pill"
              style={{
                backgroundColor: darkColor,
                color: lightColor,
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Cards;