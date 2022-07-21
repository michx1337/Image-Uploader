import { Container } from "@components/elements/Container";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignIn({ providers }) {
 const { data: session } = useSession();
 const router = useRouter();
 useEffect(() => {
 if (session) {
  router.push("/");
 }
}, [session]);

 return (
  <Container>
   <div className="flex flex-col items-center justify-center gap-4 p-8">
    {session ? (
     <h1 className="text-center font-poppins text-5xl">Redirecting...</h1>
    ) : (
     <>
      <h1 className="text-center font-poppins text-5xl">Signin with Github</h1>
      <p className="text-center text-lg text-slate-400">Authorize Github account to use all features</p>
      {Object.values(providers).map((provider) => (
       <div key={provider.name}>
        <button onClick={() => signIn(provider.id)} className="flex gap-2 cursor-pointer items-center rounded bg-button-primary px-5 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" clipRule="evenodd"/></svg>
         Sign in with {provider.name}
        </button>
       </div>
      ))}
     </>
    )}
   </div>
  </Container>
 );
}

export async function getServerSideProps(context) {
 return { props: { providers: await getProviders() } };
}