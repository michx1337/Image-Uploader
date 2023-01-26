import { ThemeProvider } from "next-themes";
import { AnimatePresence, MotionConfig } from "framer-motion";
import "@styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
 return (
  <ThemeProvider attribute="class" themes={["light", "dark"]} defaultTheme="system">
   <MotionConfig reducedMotion="user">
    <AnimatePresence exitBeforeEnter>
     <Component {...pageProps} key={router.route} />
    </AnimatePresence>
   </MotionConfig>
  </ThemeProvider>
 );
}
