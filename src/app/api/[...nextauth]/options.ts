/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import User from "@/model/userModel";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credintials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await User.findOne({
                        email: credentials.identifier
                    })
                    if (!user) {
                        throw new Error('User not found with the given user')
                    }
                    if(!user.isActive){
                        throw new Error('User has been Disabled, Please Contact the Administration')
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password')
                    }
                } catch (err: any) {
                    throw new Error(err)
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id?.toString();
                token.name =  user.name;
                token.role = user.role;
                token.email = user.email;
                token.company = user.company?.toString();
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token.id;
                session.user.role = token.role;
                session.user.email = token.email;
                session.user.company = token.company;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    },
};
