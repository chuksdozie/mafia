import SectionLayout from "@/layout/SectionLayout";
import Image from "next/image";
import React from "react";
import sendImg from "@/assets/icons/send.svg";
import portraitImg from "@/assets/images/portrait-dcc.jpeg";
import zubyImg from "@/assets/images/contributors/zuby.jpg";
import chuksImg from "@/assets/images/contributors/chuks.jpg";
import jonesImg from "@/assets/images/contributors/jones.jpeg";
import francaImg from "@/assets/images/contributors/franca.jpeg";
import defaultImg from "@/assets/images/contributors/default.png";
import Link from "next/link";

const Contributors = () => {
  const contributors = [
    {
      name: "Chiedozie Chukwu",
      role: "Fullstack Engineer",
      url: "https://www.devchuks.com",
      image: chuksImg.src,
    },
    {
      name: "Jones Ogolo",
      role: "Front-end Engineer",
      url: "https://www.jonesogolo.com",
      image: jonesImg.src,
    },
    {
      name: "Franca Francis",
      role: "UI/UX Designer",
      url: "https://www.behance.net/francafrancis",
      image: francaImg.src,
    },
    { name: "Joshua", role: "Video Editor", url: "", image: defaultImg.src },
    {
      name: "Zuby Onye",
      role: "Graphics Designer",
      url: "",
      image: zubyImg.src,
    },
  ];
  return (
    <>
      <SectionLayout header="Contributors">
        <div
          className="flex flex-wrap items-center justify-center  gap-8 max-w-[800px] self-center
        py-12"
        >
          {contributors.map((contributor, index) => (
            <Link href={contributor.url} key={index} target="_blank">
              <div className="flex flex-col items-center " key={index}>
                <Image
                  src={contributor?.image}
                  alt="send"
                  width={80}
                  height={80}
                  style={{
                    objectFit: "contain",
                    borderRadius: "50%",
                    backgroundColor: "gray",
                    width: "80px",
                    height: "80px",
                  }}
                />
                <p className="text-gray800 text-sm pt-4 font-bold">
                  {contributor.name}
                </p>
                <p className="text-gray800 text-xs pt-0">{contributor.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </SectionLayout>
    </>
  );
};

export default Contributors;
