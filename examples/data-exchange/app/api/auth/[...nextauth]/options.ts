import { env } from '@/env';
import { jwtDecode } from 'jwt-decode';
import { Account, AuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

import { encrypt } from '@/lib/encryption';

// this will refresh an expired access token, when needed
async function refreshAccessToken(token: JWT) {
  const urlObj: Record<string, any> = {
    client_id: env.KEYCLOAK_CLIENT_ID,
    client_secret: env.KEYCLOAK_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: token.refresh_token,
  };

  const resp = await fetch(`${env.REFRESH_TOKEN_URL}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(urlObj),
    method: 'POST',
  });
  const refreshToken = await resp.json();

  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}
export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${env.AUTH_ISSUER}`,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        token.decoded = jwtDecode(account.access_token as string);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < (token.expires_at as number)) {
        // token has not expired yet, return it
        return token;
      } else {
        // token is expired, try to refresh it
        try {
          const refreshedToken = await refreshAccessToken(token);
          return refreshedToken;
        } catch (error) {
          console.error('Error refreshing access token', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Send properties to the client
      session.access_token = encrypt(token.access_token as string);
      session.id_token = encrypt(token.id_token as string);
      session.roles = (
        token.decoded as {
          realm_access: { roles: string[] };
        }
      ).realm_access.roles;
      session.error = token.error as string;

      return session;
    },
  },
};
