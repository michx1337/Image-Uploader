import { useRouter } from "next/router";
import { motion, useReducedMotion } from "framer-motion";
import Head from "next/head";
import Twemoji from "react-twemoji";

export function Container(props) {
 const { children, ...customMeta } = props;
 const reduceMotion = useReducedMotion();
 const router = useRouter();

 const variants = {
  initial: {
   scale: reduceMotion ? 1 : 0.96,
   y: reduceMotion ? 0 : 15,
   opacity: 0,
  },
  animate: {
   y: 0,
   scale: 1,
   opacity: 1,
  },
  exit: {
   y: reduceMotion ? 0 : 15,
   opacity: 0,
   transition: {
    duration: reduceMotion ? 0 : 0.2,
   },
  },
  transition: {
   duration: reduceMotion ? 0 : 0.2,
  },
 };
 return (
  <>
   <Head>
    <title>Image Upload</title>
   </Head>
   <main className="flex flex-col justify-center bg-[#101827] antialiased">
    <Twemoji options={{ className: "twemoji" }}>
     <motion.div {...variants}>{children}</motion.div>
    </Twemoji>
   </main>
  </>
 );
}
