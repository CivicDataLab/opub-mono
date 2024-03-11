import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string;
    id_token: string;
    error: string;
    roles: string[];
    user: {
      /** Oauth access token */
      access_token?: string;
    } & DefaultSession['user'];
  }
}
