import React from "react";

const VideoPlayer = ({ url, title }) => {
  return (
    <iframe
      width="100%"
      className="aspect-video"
      src={url}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
