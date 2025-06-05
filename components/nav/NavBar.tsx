import Link from "next/link";
import React, { useState } from "react";
import Logo from "../base/Logo";
import { AppCtaBtn } from "../base/Buttons";
import Sidebar from "./SideBar";
import { links } from "@/constants/links";

const navlinks = [
  { title: "Start", href: "/" },
  // { title: "Resources", href: "/about" },
  // { title: "Projects", href: "/" },
  // { title: "About Us", href: "/" },
  // { title: "Projects", href: "/" },
  // { title: "Donate", href: "/" },
];
const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 gap-2 border-b-2 border-gray-100 z-20 sticky top-[-10px] bg-white h-[60px]">
      {/* <Sidebar links={navlinks} /> */}
      <div className="flex w-[20%] max-sm:w-[80%] max-sm:justify-start justify-start">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* <div className=" flex w-[40%] justify-center max-lg:hidden">
        {navlinks.map((link, index) => (
          <Link
            href={link?.href}
            key={index}
            className="font-light text-xs text-gray-700 w-[80px]"
          >
            {link?.title}
          </Link>
        ))}
      </div> */}

      <div className=" flex w-[40%] justify-end max-sm:hidden ">
        <Link href={links.join_community} target="_blank">
          <AppCtaBtn>Join Community</AppCtaBtn>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
