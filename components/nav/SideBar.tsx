import { useState, useRef, useEffect, use, act } from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { PiBookOpenUserThin } from "react-icons/pi";
import { BiDonateHeart } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [activePath, setActivePath] = useState("/");
  const router = useRouter();

  const sidebarLinks = [
    {
      title: "Home",
      href: "/",
      icon: (
        <AiOutlineHome
          size={25}
          className={`${activePath === "/" ? "text-brand900 " : ""}`}
        />
      ),
    },
    {
      title: "Courses",
      href: "/courses",
      icon: (
        <PiBookOpenUserThin
          size={25}
          className={`${activePath === "/courses" ? "text-brand900" : ""}`}
        />
      ),
    },
    // {
    //   title: "Donate",
    //   href: "/donate",
    //   icon: (
    //     <BiDonateHeart
    //     size={25}
    //       className={`${activePath === "/donate" ? "text-brand900" : ""}`}
    //     />
    //   ),
    // },
    // {
    //   title: "Search",
    //   href: "/search",
    //   icon: (
    //     <AiOutlineSearch
    //     size={25}
    //       className={`${
    //         activePath === "/search" ? "text-brand900 max-md:bg-brand600" : ""
    //       }`}
    //     />
    //   ),
    // },
    {
      title: "Feedback",
      href: "/feedback",
      icon: (
        <VscFeedback
          size={25}
          className={`${activePath === "/feedback" ? "text-brand900" : ""}`}
        />
      ),
    },
  ];

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setActivePath(router.asPath);
  }, [router]);

  return (
    <div className="bg-white" ref={sidebarRef}>
      {/* <div> */}
      {/* <RxHamburgerMenu
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-300 rounded-md lg:hidden"
        size={30}
        color={colors.brand900}
      /> */}

      <div
        // className={`absolute top-10 left-[-20px] w-[250px] h-screen bg-red-600 shadow-lg flex flex-col items-end p-4 transform ${
        //   isOpen ? "translate-x-0" : "-translate-x-full"
        // } transition-transform duration-300 ease-in-out z-10`}
        // className={`w-[250px] max-lg:w-[50px]  bg-white shadow-lg flex flex-col items-end `}
        className={`w-[250px] relative  bg-white shadow-lg flex flex-col items-end  max-md:w-[100%] max-md:fixed max-md:bottom-0 max-md:flex-row max-md:z-10 max-md:justify-evenly max-md:py-2 max-md:h-12`}
      >
        {sidebarLinks.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className={`flex items-center font-light text-base text-gray-700 w-full p-4 px-5 border-b border-gray-200 gap-2  ${
              activePath === link.href ? "bg-brand200" : ""
            }  max-md:p-1 max-md:h-9 max-md:w-9 max-md:border-0 max-md:rounded-full`}
            onClick={() => setIsOpen(false)}
          >
            {/* <MdOutlineNaturePeople className="p-0 m-0" size={15} /> */}
            {link.icon}
            <p
              className={`max-md:hidden p-0 m-0 text-xs ${
                activePath === link.href
                  ? "text-brand900 text-lg font-semibold"
                  : ""
              }`}
            >
              {link.title}
            </p>
          </Link>
        ))}
      </div>
      <p className="text-gray-400 text-xs text-center mt-5 max-lg:hidden">
        2025 - Dev Chuks Communty
      </p>
    </div>
  );
};

export default Sidebar;
