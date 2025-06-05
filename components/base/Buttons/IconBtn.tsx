import Image from "next/image";
import React from "react";
import sendImg from "@/assets/icons/send.svg";

interface IconBtnProps extends React.HTMLAttributes<HTMLButtonElement> {}

const IconBtn = ({ className, ...props }: IconBtnProps) => {
  return (
    <button
      className={`flex justify-center items-center h-12 w-12 rounded-3xl bg-brand900  ${className}`}
      {...props}
    >
      <Image
        src={sendImg.src}
        alt="send"
        width={20}
        height={20}
        style={{ objectFit: "contain" }}
      />
    </button>
  );
};

export default IconBtn;
