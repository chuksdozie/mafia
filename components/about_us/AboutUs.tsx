import SectionLayout from "@/layout/SectionLayout";
import Image from "next/image";
import React from "react";
import sendImg from "@/assets/icons/send.svg";
import portraitImg from "@/assets/images/portrait-dcc.jpeg";
import { AppCtaBtn } from "../base/Buttons";
import Link from "next/link";
import { links } from "@/constants/links";

const AboutUs = () => {
  const contributors = [
    { name: "Chiedozie Chukwu", role: "Fullstack Engineer", url: "" },
    { name: "Jones Ogolo", role: "Front-end Engineer", url: "" },
    { name: "Franca Francis", role: "UI/UX Designer", url: "" },
  ];
  const textClass = "text-left text-sm font-light text-gray-600 my-6";
  return (
    <>
      <SectionLayout header="About Us">
        <div
          className="flex  items-center justify-between  gap-8  self-center
        py-12 px-6 max-w-[1200px] mx-auto max-lg:flex-col-reverse w-full"
        >
          <div className="w-full ">
            <p className={textClass}>
              Dev Chuks Community (DCC) is a thriving tech community founded to
              bring together developers, tech professionals, and enthusiasts
              from various fields. The core values of DCC include sharing,
              respect, and goal orientation, creating a space where members can
              learn, collaborate, and grow in their tech journeys.
            </p>
            <ul className={`${textClass} list-disc pl-6`}>
              <li>A network of like-minded individuals in tech</li>
              <li>
                Learning opportunities through discussions, resources, and
                mentorship
              </li>
              <li>Collaboration on projects and tech-related initiatives</li>
              <li>
                A supportive environment for career growth and development
              </li>
            </ul>
            <p className={textClass}>
              DCC&quot;s tagline is &quot;Building Lives Through Tech&quot;,
              emphasizing its mission to empower individuals through technology.
            </p>
            <div className="flex max-lg:justify-center ">
              <Link href={links.join_community} target="_blank">
                <AppCtaBtn>Join the Community</AppCtaBtn>
              </Link>
            </div>
          </div>
          <div className="w-full">
            <iframe
              // width="500"
              height="280"
              width={"100%"}
              src={links.about_us_video}
              title="43 Questions with a Medical Doctor (HouseOfficer) ft. Dr. Uko Uyai-Abasi"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // referrerpolicy="strict-origin-when-cross-origin"
              // allowfullscreen
            ></iframe>
          </div>
        </div>
      </SectionLayout>
    </>
  );
};

export default AboutUs;
