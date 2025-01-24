import { CreateUser, FindUserById } from '@/app/utils/actions'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ profile, account, user }) {
      // create new database user for new social signups
      const oldUser = await FindUserById(user.id, 'google')
      if (!oldUser) {
        await CreateUser({
          first_name: user.name,
          last_name: user.name,
          email_address: user.email,
          oauth_id: user.id,
          auth_provider: 'google',
          job_location: '',
        })
      }
      return true
    },
    async session({ session, token }) {
      return { ...session, id: token.sub }
    },
  },
}
