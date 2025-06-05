import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import CenterModal from "../modal/CenterModal";
import LessonView from "../lesson/LessonView";

// Define the types for better structure
interface Course {
  id: number;
  image: string;
  title: string;
  link: string;
  description: string;
  path?: string;
  code?: string;
}

interface CoursePath {
  id: string | number;
  level: string;
  content: Course[];
}

interface DefaultAccordionProps {
  data: CoursePath;
}

const CourseAccordion: React.FC<DefaultAccordionProps> = ({ data }) => {
  const [closeModal, setCloseModal] = React.useState(false);
  const [seletectedCourse, setSelectedCourse] = React.useState<Course | null>();
  return (
    <div className="w-full">
      <Accordion preExpanded={[0]}>
        <AccordionItem uuid={0}>
          <AccordionItemHeading>
            <AccordionItemButton
              className={
                "accordion__button text-sm max-lg:text-xs text-gray500 font-light"
              }
            >
              {data.level}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="flex flex-col gap-4 p-2">
              {data.content.map((course) => (
                <div
                  key={course.link}
                  className="border-b p-2 rounded-md flex justify-between items-start  max-md:flex-col cursor-pointer hover:bg-gray-300"
                  onClick={() => {
                    console.log("clicked");
                    setSelectedCourse(course);
                    setCloseModal(true);
                  }}
                >
                  <div className="w-[80%] max-md:w-full max-md:mb-4">
                    <p className="text-sm max-lg:text-xs font-semibold text-left">
                      {course.title}
                    </p>
                    <p className="text-sm max-lg:text-xs text-gray-700">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 items-center w-[120px] bg-gray-200 rounded-lg">
                    <p className="text-xs text-brand950">Start Lesson</p>
                    <MdKeyboardArrowRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
      {closeModal && (
        <CenterModal
          toggleModal={() => setCloseModal((prev) => !prev)}
          width="500px"
        >
          <LessonView
            closeModal={() => setCloseModal((prev) => !prev)}
            data={seletectedCourse}
          />
        </CenterModal>
      )}
    </div>
  );
};

export default CourseAccordion;
