import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(`${process.env.APP_URL}/api/bcrypt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials.");
          }

          const user = await response.json();

          return user;
        } catch (error) {
          if (error instanceof Error) {
            console.error("Authorization error:", error.message);
          } else {
            console.error("Authorization error:", error);
          }
          return null;
        }
      },
    }),
  ],
});
