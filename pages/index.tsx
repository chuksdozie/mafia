import { Inter } from "next/font/google";
import ComingSoon from "@/components/ComingSoon";
import HomePage from "@/layout/home/HomePage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const maintenance = process.env.NEXT_PUBLIC_MODE === "maintenance"; //
  return (
    <main>
      {maintenance && <ComingSoon />}
      {!maintenance && <HomePage />}
    </main>
  );
}
