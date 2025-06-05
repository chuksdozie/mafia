import SectionLayout from "@/layout/SectionLayout";
import Image from "next/image";
import React from "react";
import sendImg from "@/assets/icons/send.svg";
import portraitImg from "@/assets/images/gallery/galleryTwo.svg";
import Link from "next/link";
import { truncate } from "fs";
import { truncateString } from "@/utils";

const EventCard = () => {
  const textClass = "text-left text-gray600 text-xs py-1";
  return (
    <div className="w-[300px] h-[400px] border border-brand400 rounded-lg">
      <Image
        src={portraitImg.src}
        alt="send"
        width={300}
        height={150}
        style={{
          objectFit: "cover",
          // borderRadius: "50%",
          backgroundColor: "gray",
          borderRadius: "8px 8px 0px 0px",
          height: "250px",
        }}
      />
      <div className="p-4">
        <span className="flex justify-between items-center">
          <p className={`${textClass} font-semibold `}>Dinner Date With BLAQ</p>
          <p className="text-gray600 text-xs p-0">16th Aug, 2025</p>
        </span>

        <p className={`${textClass}`}>
          {truncateString(
            "A bit of description about what this event is about with any notifiable details to follow",
            50
          )}
        </p>
        <p className={`${textClass}`}>5:00pm</p>
        <Link href="/">
          <p
            className={`${textClass} py-4 text-right  text-brand950 font-semibold`}
          >
            Register
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
