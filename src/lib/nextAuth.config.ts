import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "freshCart",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.apiLink_v1}/auth/signin`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          method: "POST",
        });

        const finalRes = await res.json();
        console.log("finalRes from SignIn : ", finalRes);

        if (finalRes.message == "success") {
          return {
            name: finalRes.user.name,
            email: finalRes.user.email,
            password: finalRes.user.password,
            id: finalRes.user._id,
            realTokenFromBackend: finalRes.token,
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    jwt(params) {
      // console.log("params from jwt :", params);
      if (params.user)
        params.token.realToken = params.user.realTokenFromBackend;
      // console.log("token from params" , params.token);
      
      return params.token;
    },

    session(params) {
      // console.log("params from session : ", params);

      return params.session;
    },
  },

  session: {
    maxAge: 60 * 60 * 7,
  },

  pages: {
    signIn: "/login",
  },
};
