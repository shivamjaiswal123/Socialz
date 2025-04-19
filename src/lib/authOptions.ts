import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { SigninSchema } from "@/schemas";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const result = SigninSchema.safeParse(credentials)
        if(!result.success) {
          return null
        }

        try {
          const { email, password } = result.data
          const user = await prisma.user.findUnique({
            where: {
              email
            },
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
              password: true
            }
          })


          if (!user) {
            throw new Error("User does not exist")
          }

          const isPasswordCorrect = await bcrypt.compare(password, user.password!)
          if(!isPasswordCorrect) {
            throw new Error("Incorrect Password")
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email
          }
        } catch (error) {
          throw error
        }
      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? ""
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
     signIn: async ({ user, account }: any) => {
      if(account.provider === 'credentials') {
        return true
      }

      try {
        // check if user already exist
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email
          }
        })
        // if does not exist then create new one
        if(!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              username: user.email.split("@")[0],
              email: user.email,
              image: user.image,
              OAuthProvider: "GOOGLE",
              OAuthId: account.providerAccountId
            }
          })
        }

        // update OAuth id to database user id
        user.id = existingUser?.id
        return true
      } catch (error) {
        console.log('Error in signin up with OAuth')
      }
    },
    jwt: async ({token, user}: any) => {
      if(user) {
        token.uid = user.id
        token.name = user.name
      }
      return token
    },
    session: async ({session, token}: any) => {
      if(session.user && token.uid) {
        session.user.uid = token.uid
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
  }
}