import { authOptions } from '@/lib/auth'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { CreateUser, FindUserById } from '@/app/utils/actions'

const options: NextAuthOptions = {
  ...authOptions,
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

const handler = NextAuth(options)

export { handler as GET, handler as POST }
