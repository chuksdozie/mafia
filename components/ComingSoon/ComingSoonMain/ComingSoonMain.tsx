import { AppCtaBtn } from "@/components/base/Buttons";
import TextUnderline from "@/components/base/TextUnderline";
import { links } from "@/constants/links";
import Link from "next/link";
import React from "react";

const comingYourWayPoints = [
  "Inspiring Discussions",
  "Engage with like-minded individuals on the latest trends in tech.",
  "Learning Opportunities",
  "Access exclusive tutorials, webinars, and mentorship programs.",
  "Collaboration Projects",
  "Work together on exciting open-source and community-driven projects.",
];

const ComingSoonMain = () => {
  return (
    <div className=" bg-brand700 text-white w-full rounded-xl px-4 py-6 flex flex-col justify-between items-start h-full">
      <p className="font-bold text-lg text-center mb-6">
        We’re building a <TextUnderline>vibrant</TextUnderline> tech hub where{" "}
        <TextUnderline>developers</TextUnderline>, tech professionals, and{" "}
        <TextUnderline>enthusiasts</TextUnderline> can connect, share, and grow
        together.
      </p>

      <div>
        <p className="font-semibold mb-4">What’s Coming Your Way: </p>
        <ul className="list-disc list-inside space-y-2">
          {comingYourWayPoints.map((point) => (
            <li key={point} className="text-xs md:text-[0.8125rem]">
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center w-full my-4">
        <Link href={links.join_community} target="_blank">
          <AppCtaBtn>Be Part of the Community!</AppCtaBtn>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonMain;
