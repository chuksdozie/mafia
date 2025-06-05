import React from "react";

const ShareSectionHeader = ({
  action,
  icon,
  title,
}: {
  action?: () => void;
  icon?: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex justify-between items-center bg-brand100 p-2 rounded-md">
      <h2 className="text-sm font-medium text-gray500 ml-3">{title}</h2>

      {icon && (
        <div
          className="flex justify-center items-center  gap-2 border border-gray-300 rounded-full p-1  bg-gray200 w-fit cursor-pointer"
          onClick={action}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default ShareSectionHeader;
