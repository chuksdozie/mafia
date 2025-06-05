import { courseCategory } from "@/constants/course";

export const coursesInfo = [
  {
    id: 1,
    path: courseCategory.FRONTEND_WEB,
    image: "/assets/courses/react.png",
    courses: [
      {
        id: 1,
        image: "/assets/courses/react.png",
        title: "React.js",
        description: "Getting Started with React.js",
        path: "React",
        code: "reactjs",
        playlist: "PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d",
      },
      {
        id: 2,
        image: "/assets/courses/nextjs.png",
        title: "Next.js",
        description: "Getting Started with Next.js",
        path: "Next.js",
        code: "nextjs",
        playlist: "PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw",
        // playlist: process.env.NEXT_PUBLIC_NEXTJS,
      },
      {
        id: 3,
        image: "/assets/courses/nextjs.png",
        title: "HTML",
        description: "Introduction to HTML",
        path: "HTML",
        code: "html",
        playlist: "PL4cUxeGkcC9ibZ2TSBaGGNrgh4ZgYE6Cc",
      },
    ],
  },
  {
    id: 1,
    path: courseCategory.BACKEND,
    image: "/assets/courses/react.png",
    courses: [
      {
        id: 1,
        image: "/assets/courses/react.png",
        title: "React.js",
        description: "Getting Started with React.js",
        path: "React",
        code: "reactjs",
        playlist: "PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d",
      },
      {
        id: 2,
        image: "/assets/courses/nextjs.png",
        title: "Next.js",
        description: "Getting Started with Next.js",
        path: "Next.js",
        code: "nextjs",
        playlist: "PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw",
        // playlist: process.env.NEXT_PUBLIC_NEXTJS,
      },
      {
        id: 3,
        image: "/assets/courses/nextjs.png",
        title: "HTML",
        description: "Introduction to HTML",
        path: "HTML",
        code: "html",
        playlist: "PL4cUxeGkcC9ibZ2TSBaGGNrgh4ZgYE6Cc",
      },
    ],
  },
];
