import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    KEYCLOAK_CLIENT_ID: z.string().min(1),
    KEYCLOAK_CLIENT_SECRET: z.string().min(1),
    AUTH_ISSUER: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    END_SESSION_URL: z.string().url(),
    REFRESH_TOKEN_URL: z.string().url(),
  },
  client: {},

  experimental__runtimeEnv: {},
});
