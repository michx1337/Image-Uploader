import { Container } from "@components/elements/Container";
import { useState, useRef, useEffect } from "react";
import { Link } from "@components/elements/Link";
import { CopyClipboard } from "@components/elements/Clipboard";
import { useSession, signIn } from "next-auth/react";

export default function Main(props) {
 const [image, setImage] = useState(null);
 const [createObjectURL, setCreateObjectURL] = useState(null);
 const [message, setMessage] = useState(null);
 const [error, setError] = useState(null);
 const [title, setTitle] = useState("Select your image");
 const [url, setUrl] = useState(null);
 const inputRef = useRef(null);

 useEffect(() => {
  if (typeof window !== "undefined") {
   setUrl(window.location.href);
  }
 }, [url]);

 const uploadToClient = (event) => {
  if (event.target.files && event.target.files[0]) {
   const i = event.target.files[0];
   setImage(i);
   setCreateObjectURL(URL.createObjectURL(i));
   setTitle("Now upload it! 🎉");
  }
 };

 const uploadToServer = async () => {
  const body = new FormData();
  body.append("file", image);
  const response = await fetch("/api/upload", {
   method: "POST",
   body,
  });
  const data = await response.json();
  setImage(null);
  setCreateObjectURL(null);
  setMessage(data.message);
  setError(data.error);
  setTitle("Share the link! 🎉");
 };

 const Clear = () => {
  setImage(null);
  setCreateObjectURL(null);
  setMessage(null);
  setError(null);
  setTitle("Select your image");
  inputRef.current.value = "";
 };

 const { session } = useSession();
 if (session) {
  return (
   <>
    <Container>
     <div className="p-8">
      <h1 className="pb-5 font-poppins text-5xl">{title}</h1>
      <div>
       <span className="text-sm text-slate-400">PNG, JPG and GIF (Max 100mb)</span>
       <div className="mt-2 flex items-center space-x-6 rounded-md bg-slate-700/25 p-3 shadow-md">
        <label className="block">
         <input accept=".png, .jpg, .jpeg, .gif" type="file" className="block w-full cursor-copy text-sm text-slate-400 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#2869FF] file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white file:duration-200 hover:file:bg-[#2355c8]" onChange={uploadToClient} ref={inputRef} />
        </label>
       </div>
       <div className="flex items-center">
        <span className={`${createObjectURL ? "" : "hidden"} ml-auto mt-6 text-sm text-slate-400`}>Click it ⭬</span>
        {message &&
         (error ? (
          <span className="mt-6 flex items-center text-rose-400">{error}</span>
         ) : (
          <span className="mt-6 flex items-center text-slate-400">
           Your file:{" "}
           <Link href={message} target="_blank" className="ml-1 text-[#2869FF]">
            {message}
           </Link>{" "}
           <CopyClipboard content={`${url}${message}`} />
          </span>
         ))}
        {createObjectURL && (
         <button className={`mx-4 mt-6 animate-scale cursor-pointer rounded-md border-0 bg-[#2869FF] py-2 px-4 text-sm font-semibold text-white duration-200 hover:bg-[#2355c8]`} type="submit" onClick={uploadToServer}>
          Upload!
         </button>
        )}
        {!createObjectURL && message ? (
         <button className={`mx-4 ml-auto mt-6 cursor-pointer rounded-md border-0 bg-[#2869FF] py-2 px-4 text-sm font-semibold text-white duration-200 hover:bg-[#2355c8]`} type="submit" onClick={Clear}>
          Try again!
         </button>
        ) : null}
        {!createObjectURL && !message ? (
         <button className={`pointer-events-none mx-4 ml-auto mt-6 cursor-not-allowed rounded-md border-0 bg-[#2869FF] py-2 px-4 text-sm font-semibold text-white opacity-50`} type="submit">
          Upload!
         </button>
        ) : null}
       </div>
      </div>
     </div>
    </Container>
   </>
  );
 } else {
  return (
   <>
    <Container>
     <div className="p-8">
      <h1 className="pb-5 font-poppins text-5xl">Signin with Github</h1>
      <button onClick={() => signIn()} className={`mx-4 ml-auto mt-6 cursor-pointer rounded-md border-0 bg-[#2869FF] py-2 px-4 text-sm font-semibold text-white duration-200 hover:bg-[#2355c8]`}>
       Signin with Github
      </button>
     </div>
    </Container>
   </>
  );
 }
}
