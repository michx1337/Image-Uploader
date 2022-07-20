import { Container } from "@components/elements/Container";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import { Link } from "@components/elements/Link";

export default function SignIn({ providers }) {
 const { data: session } = useSession();
 return (
  <Container>
   <div className="flex flex-col items-center justify-center gap-4 p-8">
    {session ? (
     <>
      <h1 className="text-center font-poppins text-5xl">You are already logged in!</h1>
      <p className="text-center text-lg">It looks like you are already logged in, however, you can log out of your account</p>
      <div className="flex gap-4">
       <button onClick={() => signOut()} className="flex cursor-pointer items-center rounded bg-button-action-primary px-5 py-2 leading-6 text-white duration-200 hover:bg-button-action-hover motion-reduce:transition-none">
        <svg className="h-5 w-5" aria-hidden="true" role="img" viewBox="-5 -3 24 24">
         <path fill="currentColor" d="M3.414 7.828h5.642a1 1 0 1 1 0 2H3.414l1.122 1.122a1 1 0 1 1-1.415 1.414L.293 9.536a.997.997 0 0 1 0-1.415L3.12 5.293a1 1 0 0 1 1.415 1.414L3.414 7.828zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z" />
        </svg>{" "}
        Log Out
       </button>
       <Link href="/">
        <div className="flex cursor-pointer items-center rounded bg-button-primary px-5 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
         <svg className="mr-1 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 4l-8 8l8 8" />
         </svg>{" "}
         Back to Dashboard
        </div>
       </Link>
      </div>
     </>
    ) : (
     <>
      <h1 className="text-center font-poppins text-5xl">Signin with Github</h1>
      <p className="text-center text-lg">Authorize Github account to use all features</p>
      {Object.values(providers).map((provider) => (
       <div key={provider.name}>
        <button onClick={() => signIn(provider.id)} className="flex cursor-pointer items-center rounded bg-button-primary px-5 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
         <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
         </svg>
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