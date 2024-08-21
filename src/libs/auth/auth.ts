import NextAuth, { Session, type DefaultSession } from "next-auth";
import { IUser, IUserLoginResponse, IUserToken } from "../types/user";
import Credentials, {
  CredentialsConfig
} from "next-auth/providers/credentials";
import axios from "axios";
import { API_URL } from "../utils/constants";

import { CredentialsSignin } from "@auth/core/errors";

const authUrl = process.env["NEXTAUTH_URL"] ?? "http://localhost:3000";

class InvalidLoginError extends CredentialsSignin {
  code = "custom";
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions);
    this.message = message || "Invalid login";
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     access_token: string;
//     expires_at: number;
//     refresh_token: string;
//     error?: "RefreshAccessTokenError";
//   }
// }

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & IUserToken &
      IUser &
      DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: { label: "Password", type: "password" }
      },
      authorize: (async (credentials) => {
        try {
          const payload = {
            username: credentials?.email,
            password: credentials?.password
          };

          // Call server to server
          const user = await axios.post<IUserLoginResponse>(
            `${API_URL}/auth/login-admin`,
            payload,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );

          return user.data;
        } catch (error: any) {
          console.log("error", error);
          console.log("error auth", error?.response?.data);
          throw new InvalidLoginError(error?.response?.data?.message);
        }
      }) as CredentialsConfig["authorize"]
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account, profile }) {
      const loginResponse = user as unknown as IUserLoginResponse;

      // console.log("=============================", loginResponse);
      // console.log("===============token==============", token);

      const isSignIn = trigger === "signIn";
      if (user && isSignIn) {
        return {
          ...token,
          ...loginResponse
        };
      }

      if (trigger === "update") {
        token = {
          ...(token?.user as Record<string, unknown>),
          ...session
        };

        // console.log("jwt trigger === update", token);
      }

      return token;
    },
    session({ session, token, trigger }) {
      // console.log("session", session);
      // console.log("token", token);

      // console.log("session here -==-==-=-=-=-=-=-=", session, token);

      if (session.user) {
        // @ts-ignore
        session.user = {
          ...session.user,
          ...(token.user as Session["user"]),
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string
        } as Session["user"];
      }

      if (trigger === "update") {
        session.user.image = token.avatar as string;
        session.user.name = token.name as string;
        // @ts-ignore
        session.user.accessToken = token.user.accessToken as string;

        // console.log(
        //   "trigger update session ==============================================",
        //   session,
        //   token
        // );
      }

      return session;
    }
    // async redirect({ url, baseUrl }) {
    //   return url;
    // },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  },
  // cookies: {
  //   sessionToken: {
  //     name: "sessionToken",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //       maxAge: 15,
  //     },
  //   },
  // },
  // debug: process.env.NODE_ENV === "development",
  // logger: {
  //   error(code, ...message) {
  //     console.error(code, message);
  //   },
  //   warn(code, ...message) {
  //     console.warn(code, message);
  //   },
  //   debug(code, ...message) {
  //     console.debug(code, message);
  //   },
  // },
  trustHost: true
});
