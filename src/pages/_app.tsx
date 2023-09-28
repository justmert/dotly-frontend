import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import Layout from "@/components/layout/Layout";
import { UserStateProvider } from "@/context/UserStateProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="inner-analytics" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <UserStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserStateProvider>
    </>
  );
}
