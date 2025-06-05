import { AppCtaBtn } from "@/components/base/Buttons";
import { links } from "@/constants/links";
import Link from "next/link";
import React from "react";

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-xl w-full text-center bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl md:text-2xl font-bold text-gray-800 mb-6">
          We love to hear from you 💬
        </h1>
        <p className="text-gray-600 text-md mb-8">
          Your feedback helps us keep building lives through tech — we’d love to
          hear from you!
        </p>

        <Link href={links.feedback} target="_blank">
          <AppCtaBtn>Send Us Your Thoughts</AppCtaBtn>
        </Link>
      </div>
    </div>
  );
};

export default Feedback;
