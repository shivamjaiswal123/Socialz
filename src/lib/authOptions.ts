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
    async signIn({ user, account }: any) {
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
      return true
    },
  },
  pages: {
    signIn: '/signin',
  }
}