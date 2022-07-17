import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, useReducedMotion } from "framer-motion";

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
    <Image src="/source/background.jpg" loading="lazy" alt="Background" className="fixed z-10 h-full w-full max-w-none blur-3xl" layout="fill" />
    <motion.div {...variants} className="z-20">
     {children}
    </motion.div>
   </main>
  </>
 );
}
