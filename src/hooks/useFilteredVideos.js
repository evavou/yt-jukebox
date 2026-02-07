// src/hooks/useFilteredVideos.js
import { useMemo } from 'react';

export function useFilteredVideos({
  videos,
  selectedTag,
  selectedChannel,
  searchQuery,
  durationRange,
  allChannels
}) {

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
        // 1. Filtre par tag
        const tagMatch = selectedTag === 'all' || video.tags.includes(selectedTag);
        
        // 2. Filtre par channel
        let channelMatch;
        if (selectedChannel === 'other') {
        channelMatch = !allChannels.includes(video.channel);
        } else {
        channelMatch = selectedChannel === 'every channel' || video.channel === selectedChannel;
        }
        // 3. Filtre par recherche
        const searchMatch = searchQuery === '' || 
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            video.channel.toLowerCase().includes(searchQuery.toLowerCase());
        
        // 4. Filtre par durée
        const videoDuration = video.hours * 60 + video.minutes;
        const passesMin = videoDuration >= durationRange.min;
        const passesMax = durationRange.max >= 480 ? true : videoDuration <= durationRange.max;
        const durationMatch = passesMin && passesMax;
        
        return tagMatch && channelMatch && searchMatch && durationMatch;
    });
  }, [videos, selectedTag, selectedChannel, searchQuery, durationRange]);

  return filteredVideos;
}