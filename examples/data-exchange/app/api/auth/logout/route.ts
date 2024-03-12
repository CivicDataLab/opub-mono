import { env } from '@/env';
import { getServerSession } from 'next-auth';

import { getIdToken } from '@/lib/sessionTokenAccessor';
import { authOptions } from '../[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const idToken = await getIdToken();

    const url = `${env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(env.NEXTAUTH_URL)}`;

    try {
      await fetch(url, { method: 'GET' });
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 200 });
}
