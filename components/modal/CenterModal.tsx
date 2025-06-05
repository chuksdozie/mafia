import React from "react";
import Portal from "./Portal";

const CenterModal = ({
  toggleModal,
  children,
  width,
}: {
  toggleModal: () => void;
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <Portal>
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50"
        onClick={() => {
          console.log("Overlay clicked!");
          toggleModal();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-[65%] max-lg:w-[90%] bg-brand200 rounded-lg p-4 z-50`}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default CenterModal;
