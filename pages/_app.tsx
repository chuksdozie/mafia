import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import PageLayout from "@/layout/PageLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo {...SEO} />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}
