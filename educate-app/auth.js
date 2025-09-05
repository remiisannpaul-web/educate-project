// educate-app/auth.js

import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();
        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        }).lean();
        if (!user) {
          return null;
        }

        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) {
          return null;
        }

        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? "",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only run for Google OAuth
      if (account?.provider === "google") {
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email: user.email }).lean();

        if (!existingUser) {
          // Create new user from Google data
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            // Google users don't have passwords, so we'll set a placeholder
            password: "google-oauth-user", // You might want to handle this differently
            // Add any other fields you want to save
          });

          // Update the user object with the new ID
          user.id = String(newUser._id);
        } else {
          // User exists, use their ID
          user.id = String(existingUser._id);
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
