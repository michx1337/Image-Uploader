import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// https://next-auth.js.org/configuration/options
export const authOptions = {
 providers: [
  GithubProvider({
   clientId: "Iv1.2c781e357dc3bbb3",
   clientSecret: "c874c657105854bc5303d37a38b4079d960aa087",
  }),
 ],
 session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
 },
 theme: {
  colorScheme: "auto", // "auto" | "dark" | "light"
  brandColor: "#111927",
  buttonText: "#000000",
 },
 callbacks: {
  async jwt({ token }) {
   token.userRole = "admin";
   return token;
  },
 },
};

export default NextAuth(authOptions);