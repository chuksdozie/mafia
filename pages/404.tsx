// pages/404.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null; // You can also add a loading spinner here if needed
};

export default Custom404;
