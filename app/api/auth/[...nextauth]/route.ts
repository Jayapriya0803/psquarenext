import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
providers: [
  GoogleProvider({
    clientId: 35361080936-1tgfclraafg8igbf0icib3hqto77us9f.apps.googleusercontent.com,
    clientSecret: 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
  })
    // ...add more providers here
  ],
  providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
]
}

const handler = NextAuth({authOptions})

export { handler as GET, handler as POST }