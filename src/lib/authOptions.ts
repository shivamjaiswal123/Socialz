import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

export const authOptions = {
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? ""
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
     signIn: async ({ user, account }: any) => {
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