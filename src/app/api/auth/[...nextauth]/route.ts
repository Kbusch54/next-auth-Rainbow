import NextAuth, { NextAuthOptions, Session } from "next-auth";
// import { ethers } from "ethers";
import { authOptions } from "@/utils/authOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

