import React from "react";

type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
  width?: string;
  height?: string;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = "YouTube Video",
  width = "100%",
  height = "315px",
}) => {
  if (!videoId) {
    return <div>Invalid video ID</div>;
  }

  return (
    <div className="youtube-embed relative overflow-hidden pt-[56.25%] rounded-[10px]">
      <iframe
        title={title}
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default YouTubeEmbed;
