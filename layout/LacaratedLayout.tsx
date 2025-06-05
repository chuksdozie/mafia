import React from "react";

const LacaratedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative p-2 overflow-hidden">
      {/* Left jagged edge with shadow */}
      <div className="absolute top-0 left-0 h-full w-6 overflow-hidden">
        <svg
          className="h-full w-6 filter drop-shadow-md"
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="20,0 0,5 20,10 0,15 20,20 0,25 20,30 0,35 20,40 0,45 20,50 0,55 20,60 0,65 20,70 0,75 20,80 0,85 20,90 0,95 20,100"
            fill="#ffffff"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Right jagged edge with shadow */}
      <div className="absolute top-0 right-0 h-full w-6 overflow-hidden">
        <svg
          className="h-full w-6 filter drop-shadow-md"
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 20,5 0,10 20,15 0,20 20,25 0,30 20,35 0,40 20,45 0,50 20,55 0,60 20,65 0,70 20,75 0,80 20,85 0,90 20,95 0,100"
            fill="#ffffff"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="px-6">{children}</div>
    </div>
  );
};

export default LacaratedLayout;
