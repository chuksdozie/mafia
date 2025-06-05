import Footer from "@/components/nav/Footer";
import NavBar from "@/components/nav/NavBar";
import Sidebar from "@/components/nav/SideBar";
import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const maintenance = process.env.NEXT_PUBLIC_MODE === "maintenance"; //
  if (maintenance) return <>{children}</>;
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> */}
        <div className="w-full overflow-scroll  pt-3 h-full flex flex-col justify-between">
          <div className="content">{children}</div>
          <p className="text-center text-sm text-gray-600 mt-6">
            built by{" "}
            <a
              href="https://devchuks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Chiedozie Chukwu
            </a>{" "}
            in collaboration with{" "}
            <a
              href="https://community.devchuks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              DCC
            </a>
          </p>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
