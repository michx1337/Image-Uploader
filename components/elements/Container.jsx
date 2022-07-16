import { useRouter } from "next/router";
import { motion, useReducedMotion } from "framer-motion";
import Head from "next/head";

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
   <main className="flex flex-col justify-center overflow-hidden bg-[#101827] antialiased">
    <img src="https://tailwindcss.com/_next/static/media/hero-dark@90.a7a063e8f9d179fbd72b0b735c5797b7.jpg" alt="Background" className="fixed z-10 h-full w-full max-w-none blur-3xl" width="1308" />
    <motion.div {...variants} className="z-20">
     {children}
    </motion.div>
   </main>
  </>
 );
}
