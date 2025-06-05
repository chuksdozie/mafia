import React from "react";
import { SocialArea } from "../ComingSoon/ComingSoonCard/ComingSoonCard";
import Link from "next/link";
import { IconBtn } from "../base/Buttons";
import { EmailInput } from "../base/Inputs";

const Footer = () => {
  const socialLinks = [
    { title: "Tiktok", href: "https://www.tiktok.com/@iamchuksdozie" },
    { title: "X (Twitter)", href: "https://x.com/iamchuksdozie" },
    { title: "Instagram", href: "https://www.instagram.com/iamchuksdozie" },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/chukwu-chiedozie/",
    },
    // { title: "LinkedIn", href: "https://linkedin.com/" },
    // { title: "LinkedIn", href: "https://linkedin.com/" },
    // { title: "LinkedIn", href: "https://linkedin.com/" },
  ];
  return (
    <div className="bg-brand900 text-white flex flex-col items-center justify-center p-5 py-[50px]">
      {/* <div className="flex gap-4 items-center max-lg:flex-col">
        <p className="text-xs font-extralight">
          Sign up to join the community today
        </p>
        <div className="flex gap-2 items-center bg-gray-100 rounded-full p-2 w-[300px]">
          <EmailInput placeholder="Your Email" className="h-[40px] w-[85%]" />
          <IconBtn className="w-9 h-9" />
        </div>
      </div> */}
      <p className="mt-4  text-xs">Stay Updated:</p>
      <p className="mb-6 font-extralight text-xs">
        Follow us on social media and never miss an update
      </p>
      {/* <SocialArea className="flex flex-col items-center text-center" /> */}
      <div className="flex flex-wrap justify-center ">
        {socialLinks.map((link, index) => (
          <Link
            href={link?.href}
            key={index}
            className="font-light text-xs text-gray-100 w-[60px] mx-2"
          >
            {link?.title}
          </Link>
        ))}
      </div>
      <p className="text-xs text-gray-100 font-extralight mt-6">
        © Copyright 2025 - DCC Community
      </p>
    </div>
  );
};

export default Footer;
