import Head from "next/head";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";

export function Container(props) {
 const { children, ...customMeta } = props;
 const reduceMotion = useReducedMotion();

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
 const { data: session } = useSession();
 return (
  <>
   <Head>
    <title>Image Upload</title>
   </Head>
   <main className="flex h-screen flex-col items-center justify-center overflow-hidden bg-[#101827] antialiased">
    <Image src="/source/background.jpg" loading="lazy" alt="Background" className="fixed z-10 h-full w-full max-w-none blur-3xl" layout="fill" />
    <nav className="fixed top-0 left-0 right-0 z-20 w-full p-2">
     {session ? (
      <div className="float-right ml-auto flex items-center">
       <h1 className="px-3 text-xl text-slate-400">
        Signed in as <span className="italic">{session.user.name}</span>
       </h1>
       <button onClick={() => signOut()} className={`ml-auto flex cursor-pointer items-center gap-2 rounded-md border-0 bg-button-action-primary py-2 px-4 text-sm font-semibold text-white duration-200 hover:bg-button-action-hover `}>
        Logout
       </button>
      </div>
     ) : (
      <div className="float-right ml-auto flex items-center">
       <button onClick={() => signIn()} className={`ml-auto flex cursor-pointer items-center gap-2 rounded-md border-0 bg-[#2869FF] py-2 px-4 text-sm font-semibold text-white duration-200 hover:bg-[#2355c8]`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
         <path fill="currentColor" fillRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" clipRule="evenodd" />
        </svg>
        Signin with Github
       </button>
      </div>
     )}
    </nav>
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
