import React from "react";
import ComingSoonCard from "./ComingSoonCard";

const ComingSoon = () => {
  return (
    <section
      className={`min-h-screen bg-coming-soon bg-cover bg-no-repeat bg-left-top`}
    >
      <div className="min-h-screen w-full flex justify-center items-center bg-blackOverlay">
        <ComingSoonCard />
      </div>
    </section>
  );
};

export default ComingSoon;
