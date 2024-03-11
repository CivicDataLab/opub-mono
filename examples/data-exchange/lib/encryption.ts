import Cryptr from 'cryptr';

export function encrypt(text: string) {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not defined');
  }

  const secretKey = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decrypt(encryptedString: string) {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET is not defined');
  }
  const secretKey = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretKey);

  const text = cryptr.decrypt(encryptedString);
  return text;
}
