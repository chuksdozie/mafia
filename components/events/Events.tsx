import SectionLayout from "@/layout/SectionLayout";
import Image from "next/image";
import React from "react";
import sendImg from "@/assets/icons/send.svg";
import portraitImg from "@/assets/images/portrait-dcc.jpeg";
import EventCard from "./EventCard";

const Events = () => {
  const events = [
    { name: "Chiedozie Chukwu", role: "Fullstack Engineer", url: "" },
    { name: "Jones Ogolo", role: "Front-end Engineer", url: "" },
    { name: "Franca Francis", role: "UI/UX Designer", url: "" },
  ];
  return (
    <>
      <SectionLayout header="Upcoming Events">
        <div
          className="flex flex-wrap items-center justify-center  gap-8  self-center
        py-12"
        >
          {events.map((event, index) => (
            <EventCard key={index} />
          ))}
        </div>
      </SectionLayout>
    </>
  );
};

export default Events;
