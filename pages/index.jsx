import { Container } from "@components/elements/Container";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Main(props) {
 const [image, setImage] = useState(null);
 const [createObjectURL, setCreateObjectURL] = useState(null);
 const uploadToClient = (event) => {
  if (event.target.files && event.target.files[0]) {
   const i = event.target.files[0];
   setImage(i);
   setCreateObjectURL(URL.createObjectURL(i));
  }
 };

 const uploadToServer = async () => {
  const body = new FormData();
  body.append("file", image);
  const response = await fetch("/api/upload", {
   method: "POST",
   body,
  });
 };
 return (
  <>
   <Container>
    <div className="flex h-screen flex-col items-center justify-center">
     <div className="gap-6 rounded-md border border-slate-500/20 bg-slate-900/70 shadow-md backdrop-blur">
      <div class="flex-none border-b border-slate-500/30">
       <div class="flex h-8 items-center space-x-1.5 px-3">
        <div class="h-2.5 w-2.5 rounded-full bg-slate-600"></div>
        <div class="h-2.5 w-2.5 rounded-full bg-slate-600"></div>
        <div class="h-2.5 w-2.5 rounded-full bg-slate-600"></div>
       </div>
      </div>
      <div className="p-8">
       <h1 className="pb-5 font-poppins text-5xl">{!createObjectURL ? "Select your image" : "Now upload it! 🎉"}</h1>
       <div>
        <span className="text-sm text-slate-400">PNG, JPG and GIF (Max 100mb)</span>
        <div class="mt-2 flex items-center space-x-6 rounded-md bg-slate-700/25 p-3 shadow-md">
         <label class="block">
          <input type="file" class="block w-full cursor-copy text-sm text-slate-400 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#2869FF] file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white file:duration-200 hover:file:bg-[#2355c8]" onChange={uploadToClient} />
         </label>
        </div>
        <div className="flex items-center">
         <span className={`${createObjectURL ? "" : "hidden"} ml-auto mt-6 text-sm text-slate-400`}>Click it ⭬</span>
         <button
          className={`${createObjectURL ? "animate-scale cursor-pointer" : "pointer-events-none ml-auto cursor-not-allowed opacity-50"} mx-4 mt-6 rounded-md border-0
        bg-[#2869FF] py-2
        px-4 text-sm font-semibold
        text-white duration-200
        hover:bg-[#2355c8]`}
          type="submit"
          onClick={uploadToServer}
         >
          Upload!
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </Container>
  </>
 );
}
