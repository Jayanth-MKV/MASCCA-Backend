import * as crypto from 'crypto';

export async function generateRandomToken(): Promise<string> {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}