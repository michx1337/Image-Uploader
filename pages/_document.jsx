import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ props }) {
 return (
  <Html lang="en">
   <Head>
    <meta name="robots" content="follow, index" />
    <link rel="icon" href="/source/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
   </Head>
   <body className="relative bg-[#101827]">
    <Main {...props} />
    <NextScript />
   </body>
  </Html>
 );
}
