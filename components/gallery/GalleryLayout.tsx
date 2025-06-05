import Image from "next/image";
import React from "react";
import portraitImg from "@/assets/images/portrait-dcc.jpeg";
import galleryOne from "@/assets/images/gallery/galleryOne.svg";
import galleryTwo from "@/assets/images/gallery/galleryTwo.svg";
import galleryThree from "@/assets/images/gallery/galleryThree.svg";
import galleryFour from "@/assets/images/gallery/galleryFour.svg";
import galleryFive from "@/assets/images/gallery/galleryFive.svg";
import gallerySix from "@/assets/images/gallery/gallerySix.svg";
// import portraitImg from "@/assets/images/portrait-dcc.jpeg";

const images = [
  { src: galleryOne.src, span: "row-span-1" },
  { src: galleryTwo.src, span: "row-span-1" },
  { src: galleryThree.src, span: "row-span-1" },
  { src: galleryFour.src, span: "row-span-1" },
  { src: galleryFive.src, span: "row-span-1" },
  { src: gallerySix.src, span: "row-span-1" },
];

const imgStyles =
  "w-[302px] h-[221px] object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg";

const DottedLines = ({
  direction,
  className,
}: {
  direction: "horizontal" | "vertical";
  className?: string;
}) => {
  return (
    <div
      className={`absolute ${
        direction === "horizontal" ? "border-t" : "border-l"
      }  h-[50px] border-dashed border-yellow-500 w-full top-[220px] left-[140px] max-lg:hidden ${className} `}
    ></div>
  );
};

const GalleryLayout = () => {
  return (
    <div className="flex bg-brand900 px-10 py-10 gap-7 max-lg:flex-col">
      <div className="flex flex-col gap-10 relative">
        <Image
          src={images[0].src}
          alt={`Gallery Image`}
          width={140}
          height={140}
          className={imgStyles}
        />
        <DottedLines direction="vertical" />
        <DottedLines direction="horizontal" className="top-[240px] w-[200px]" />

        <Image
          src={images[1].src}
          alt={`Gallery Image`}
          width={140}
          height={140}
          className={imgStyles}
        />
      </div>
      <div className="flex justify-center items-center relative">
        <DottedLines
          direction="vertical"
          className="top-[90px] left-[140px] w-[200px]"
        />
        <DottedLines direction="horizontal" className="top-[90px] w-[200px]" />
        <Image
          src={images[2].src}
          alt={`Gallery Image`}
          width={140}
          height={140}
          className={imgStyles}
        />
      </div>
      <div className="flex flex-col gap-10 relative">
        <Image
          src={images[3].src}
          alt={`Gallery Image`}
          width={140}
          height={140}
          className={imgStyles}
        />
        <DottedLines
          direction="vertical"
          className="top-[220px] left-[140px] w-[200px]"
        />
        <Image
          src={images[4].src}
          alt={`Gallery Image`}
          width={140}
          height={140}
          className={imgStyles}
        />
      </div>
      <div className="flex justify-center items-center relative">
        <Image
          src={images[5].src}
          alt={`Gallery Image`}
          width={140}
          height={140}
          className={imgStyles}
        />
        <DottedLines
          direction="vertical"
          className="top-[350px] left-[140px] w-[200px]"
        />
        <DottedLines
          direction="horizontal"
          className="top-[400px] left-[-170px] w-[200px]"
        />
      </div>
    </div>
  );
};

export default GalleryLayout;
