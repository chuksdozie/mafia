import React from "react";
import GalleryLayout from "./GalleryLayout";

const Gallery = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-brand900 px-10 min-h-[200px] pt-[60px] pb-[50px] z-20">
      <p className="text-xl font-semibold text-center my-3  text-gray-100 max-md:text-xl max-md:font-semibold">
        Community Gallery
      </p>
      <GalleryLayout />
    </div>
  );
};

export default Gallery;
