import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// https://next-auth.js.org/configuration/options
export const authOptions = {
 providers: [
  GithubProvider({
   clientId: process.env.GITHUB_CLIENT_ID,
   clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
 ],
 session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
 },
 secret: process.env.SECRET,
 theme: {
  colorScheme: "auto", // "auto" | "dark" | "light"
  brandColor: "#111927",
  buttonText: "#000000",
 },
 callbacks: {
  async jwt({ token }) {
   return token;
  },
 },
};

export default NextAuth(authOptions);