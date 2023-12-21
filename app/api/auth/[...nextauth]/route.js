import {providers} from "next-auth/core/routes";
import Credentials from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
import NextAuth from "next-auth";


const prisma = new PrismaClient();


export const authOptions = {

    // adapter:   PrismaAdapter(prisma),

    providers: [
        Credentials({
            name:        'credentials',
            credentials: {
                username: {
                    label:       'Username',
                    type:        'text',
                    placeholder: 'jsmith'
                },
                password: {
                    label: 'password',
                    type:  'password'
                }
            },
            async authorize({ request }) {
                const response = await fetch(request)
                if (!response.ok) return null
                return await response.json() ?? null
            }
        })


    ],
    session:{
        strategy:'jwt'

    },
    secret:    process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',


}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}