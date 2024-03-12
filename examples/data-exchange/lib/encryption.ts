import { env } from '@/env';
import Cryptr from 'cryptr';

export function encrypt(text: string) {
  if (!env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not defined');
  }

  const secretKey = env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decrypt(encryptedString: string) {
  if (!env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not defined');
  }
  const secretKey = env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretKey);

  const text = cryptr.decrypt(encryptedString);
  return text;
}
