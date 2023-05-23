import NextAuth, { Account, Profile, User } from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import Auth0Provider from 'next-auth/providers/auth0'
import TwitterProvider from 'next-auth/providers/twitter'
import FacebookProvider from 'next-auth/providers/facebook'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Github
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Auth0
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt', // another one is 'database', for 'jwt', it will store session data in cookies
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT
      user?: User | AdapterUser
      account?: Account | null
      profile?: Profile | undefined
      isNewUser?: boolean | undefined
    }) {
      if (user) {
        token.provider = account?.provider
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.provider = token.provider
      }
      return session
    },
  },
})
