import React from "react";

const ListItem = ({
  title,
  onClose,
}: {
  title: string;
  onClose?: () => void;
}) => {
  return (
    <div className="py-3 border-b border-gray-200 w-full flex flex-row justify-between mt-1">
      <div>
        <p className="text-brand900 text-sm ">{title}</p>
      </div>

      {onClose && (
        <button className="text-red-500 text-sm ml-2" onClick={onClose}>
          X
        </button>
      )}
    </div>
  );
};

export default ListItem;
