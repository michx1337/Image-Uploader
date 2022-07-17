import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
 const { data: session } = useSession();
 if (session) {
  return (
   <div>
    <p>You are signed in!</p>
    <button onClick={signOut}>Sign out</button>
   </div>
  );
 } else {
  return (
   <div>
    <p>You are not signed in.</p>
    <button onClick={signIn}>Sign in</button>
   </div>
  );
 }
 }
