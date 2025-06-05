import React from "react";

const SectionLayout = ({
  children,
  header,
  subHeader,
}: {
  children: React.ReactNode;
  header: string;
  subHeader?: string;
}) => {
  return (
    <div className="flex flex-col  text-center pt-[60px] bg-gray100 items-center w-[90%]">
      <p className="text-center w-[100%] text-lg text-gray600 font-semibold mb-4">
        {header}
      </p>
      {subHeader && (
        <p className="text-center mx-auto w-full md:w-[50%] text-gray500 font-light text-sm my-4">
          {subHeader}
        </p>
      )}
      {children}
    </div>
  );
};

export default SectionLayout;
