import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, MotionConfig } from "framer-motion";
import "@styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
 return (
  <SessionProvider session={session} refetchInterval={5 * 60} refetchOnWindowFocus={true}>
   <ThemeProvider attribute="class" themes={["light", "dark"]} defaultTheme="system">
    <MotionConfig reducedMotion="user">
     <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
     </AnimatePresence>
    </MotionConfig>
   </ThemeProvider>
  </SessionProvider>
 );
}
