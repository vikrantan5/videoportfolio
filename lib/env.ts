import { readFileSync } from 'fs';
import path from 'path';

export function getResendKey(): string | null {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  try {
    const envPath = path.join(process.cwd(), '..', 'backend', '.env');
    const raw = readFileSync(envPath, 'utf8');
    const line = raw.split('\n').find((l) => l.startsWith('RESEND_API_KEY='));
    if (line) {
      const val = line.slice('RESEND_API_KEY='.length).trim();
      return val || null;
    }
  } catch {
    /* not available on Vercel — set RESEND_API_KEY env var there */
  }
  return null;
}
