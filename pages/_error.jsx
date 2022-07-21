import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ErrorPage() {
 const router = useRouter()
 useEffect(() => {
   router.push("/")
 })
 return null
}
