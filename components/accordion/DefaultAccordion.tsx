import { useRouter } from "next/router";
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

// Define the types for better structure
interface Course {
  id: number;
  image: string;
  title: string;
  description: string;
  path: string;
  code?: string;
  playlist: string;
}

interface CoursePath {
  id: number;
  path: string;
  image: string;
  courses: Course[];
}

interface DefaultAccordionProps {
  data: CoursePath[];
}

const DefaultAccordion: React.FC<DefaultAccordionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <Accordion allowZeroExpanded>
        {data.map((item) => (
          <AccordionItem key={item.id}>
            <AccordionItemHeading>
              <AccordionItemButton
                className={
                  "accordion__button text-sm max-lg:text-xs text-gray500 font-light"
                }
              >
                {item.path}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="flex flex-col gap-4 p-2">
                {item.courses.map((course) => (
                  <div
                    key={course.id}
                    className="border-b p-2 rounded-md flex  cursor-pointer justify-between items-start  max-md:flex-col hover:bg-gray-300"
                    onClick={() =>
                      router.push({
                        pathname: `/courses/${course.code}`,
                        query: {
                          playlist: course.playlist as string,
                          title: course.title as string,
                        },
                      })
                    }
                  >
                    <div className="w-[80%] max-md:w-full max-md:mb-4">
                      <p className="text-sm max-lg:text-xs font-semibold text-left">
                        {course.title}
                      </p>
                      <p className="text-sm max-lg:text-xs text-gray-700 text-left">
                        {course.description}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2 items-center  w-[120px] bg-gray-200 rounded-lg">
                      <p className="text-xs text-brand950">Open Course</p>
                      <MdKeyboardArrowRight size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DefaultAccordion;
