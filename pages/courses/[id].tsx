import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeroSection from "@/components/hero/HeroSection";
import { coursesInfo } from "@/data/coursesData";
import { courseNames } from "@/constants/course";
import DefaultAccordion from "@/components/accordion/DefaultAccordion";
import CourseAccordion from "@/components/accordion/CourseAccordion";
import { getAllPlaylistVideos } from "@/hooks/fetchCourses";
import Loader from "@/components/loader/Loader";

interface CourseData {
  id: number;
  level: string;
  content: any[];
}

const CoursePage = () => {
  const router = useRouter();
  const id = router.query.id;
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // const loadCourse = async () => {
    //   if (router?.query?.id) {
    //     try {
    //       // Dynamically import the course module
    //       const courseModule = await import(
    //         `../../data/courses/${router.query.id}.ts`
    //       );
    //       console.log({ courseModule: courseModule.data });

    //       if (courseModule?.data) {
    //         setCourseData(courseModule.data);
    //       } else {
    //         throw new Error("Invalid course structure");
    //       }
    //     } catch (error) {
    //       console.error("Error loading course:", error);
    //       setError("Course not found or failed to load.");
    //     }
    //   }
    // };

    const loadCourse = async () => {
      if (router?.query?.id) {
        try {
          const playlistId = Array.isArray(router.query.playlist)
            ? router.query.playlist[0]
            : router.query.playlist ?? "";
          const data = await getAllPlaylistVideos(playlistId);
          // .then((videos) => {
          //   console.log(JSON.stringify(videos, null, 2));
          // });
          console.log({ prepeprpere: data });
          setCourseData(
            // [

            {
              id: 0,
              level: "Module 1",
              content: data,
            }
            // {
            //   id: 1,
            //   level: "intermediate",
            //   content: [],
            // },
            // ]
          );
        } catch (error) {
          console.error("Error loading course:", error);
          setError("Course not found or failed to load.");
        }
      }
    };

    loadCourse();
  }, [router.query.id]);

  if (error) return <p>{error}</p>;
  if (!courseData) return <Loader />;

  return (
    <div className="flex flex-col items-center">
      <HeroSection header={router.query.title} subHeader=" " />
      <div className="flex w-[90%] my-[50px]">
        <CourseAccordion data={courseData} />
      </div>
    </div>
  );
};

export default CoursePage;
