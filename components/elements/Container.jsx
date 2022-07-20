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
   <main className="flex flex-col justify-center overflow-hidden bg-[#101827] antialiased h-screen items-center">
    <Image src="/source/background.jpg" loading="lazy" alt="Background" className="fixed z-10 h-full w-full max-w-none blur-3xl" layout="fill" />
    <motion.div {...variants} className="z-20">
    <div className="gap-6 rounded-md border border-slate-500/20 bg-slate-900/70 shadow-md backdrop-blur">
    <div className="flex-none border-b border-slate-500/30">
       <div className="flex h-8 items-center space-x-1.5 px-3">
        <div className="h-2.5 w-2.5 rounded-full bg-slate-600"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-slate-600"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-slate-600"></div>
       </div>
      </div>
     {children}
    </div>
    </motion.div>
   </main>
  </>
 );
}
