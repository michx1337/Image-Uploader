import { Container } from "@components/elements/Container";
import { useState, useRef, useEffect } from "react";
import { Link } from "@components/elements/Link";
import { CopyClipboard } from "@components/elements/Clipboard";
import { useSession, signIn } from "next-auth/react";

export default function Main(props) {
 const { data: session } = useSession();
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

  return (
   <>
    <Container>
     <div className="p-8">
      {session ? (
       <>
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
       </>
       ) : (
       <>
        <h1 className="pb-5 font-poppins text-5xl">Signin with Github</h1>
        <p className="text-lg text-slate-400">Authorize Github account to use all features</p>
      <button onClick={() => signIn()} className={`flex items-center gap-2 mt-6 cursor-pointer rounded-md border-0 bg-[#2869FF] py-2 px-4 text-sm font-semibold text-white duration-200 hover:bg-[#2355c8]`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" clip-rule="evenodd"/></svg> Signin with Github
      </button>
</>
      )}
     </div>
    </Container>
   </>
  );
}
