import NextAuth from "next-auth";
import { authOptions } from "./options";

const Handler = NextAuth(authOptions);
export { Handler as GET, Handler as POST };