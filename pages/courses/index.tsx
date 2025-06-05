import { useEffect } from "react";
import { useRouter } from "next/router";
import AboutUs from "@/components/about_us/AboutUs";
import Stacks from "@/components/stacks/Stacks";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // window.location.href = "https://youtu.be/kKlQlgzMLvw";
    console.log({ router: router.asPath });
  }, [router]);

  return (
    <div className="flex flex-col items-center ">
      <Stacks />
    </div>
  );
};

export default Index;
