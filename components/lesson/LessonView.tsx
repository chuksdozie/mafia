import React from "react";
import YouTubeEmbed from "./YoutubeEmbed";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

const LessonView = ({
  closeModal,
  data,
}: {
  closeModal: () => void;
  data: any;
}) => {
  console.log({ data });
  return (
    <div className="bg-brand200">
      <div className="flex justify-between items-center mb-4 text-sm max-lg:text-xs">
        <p>{data?.title}</p>
        {/* <MdAirlineSeatReclineExtra onClick={closeModal} /> */}
        <IoIosCloseCircleOutline
          onClick={closeModal}
          size={25}
          className="cursor-pointer hover:bg-red-600 rounded-full text-gray-500"
        />
      </div>

      <YouTubeEmbed videoId={data?.link} />
      <div className="flex  flex-col justify-between my-2">
        {/* <div className="flex justify-end gap-2 my-2">
          <div className="flex border border-gray-300 py-2 px-4 rounded-md items-center gap-2 text-sm max-lg:text-xs">
            <FaArrowLeft />
            Next
          </div>
          <div className="flex border border-gray-300 py-2 px-4 rounded-md items-center gap-2 text-sm max-lg:text-xs">
            Previous <FaArrowRight />
          </div>
        </div> */}
        <p className="text-sm max-lg:text-xs">{data?.description}</p>
      </div>
    </div>
  );
};

export default LessonView;
