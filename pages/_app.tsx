import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import PageLayout from "@/layout/PageLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo {...SEO} />
      <PageLayout>
        <ToastContainer />
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}
