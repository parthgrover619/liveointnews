import React from 'react';

const VideoPlayer = ({ url, title }) => {
  if (!url) return null;

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Extract Vimeo ID
  const getVimeoId = (url) => {
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);

  // YouTube embed
  if (youtubeId) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title || 'Video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Vimeo embed
  if (vimeoId) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title={title || 'Video'}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Direct video link
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return (
      <video 
        className="w-full rounded-lg" 
        controls 
        preload="metadata"
      >
        <source src={url} type={`video/${url.split('.').pop()}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  // Fallback: show link
  return (
    <div className="bg-muted p-6 rounded-lg text-center">
      <p className="text-muted-foreground mb-3">Video available at:</p>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary hover:underline font-medium"
      >
        Watch Video
      </a>
    </div>
  );
};

export default VideoPlayer;
