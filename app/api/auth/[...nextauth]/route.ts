import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    // TODO: Implementar la autenticación con credenciales
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     emaiil: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   // TODO: Implementar la lógica de autenticación
    //   async authorize(credentials, req) {
    //     const user = { id: 1, name: "Admin" };
    //     return user;
    //   },
    // }),
    // TODO: Implementar la autenticación con Google
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
    // TODO: Implementar la autenticación con Apple
    // AppleProvider({})
  ],
});

export { handler as GET, handler as POST };
