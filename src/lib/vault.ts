/**
 * Token zamčený heslem. Při buildu se GitHub token zašifruje heslem
 * (PBKDF2-SHA256 → AES-256-GCM) a do admin stránky jde jen výsledek.
 * Heslo ani token tak v kódu stránky nejsou; prohlížeč token rozšifruje,
 * až když někdo zadá správné heslo. Funguje v Node (build) i v prohlížeči.
 */
export type Vault = { v: 1; iter: number; salt: string; iv: string; data: string };

const ITERATIONS = 600_000; // doporučení OWASP pro PBKDF2-SHA256
const AAD = new TextEncoder().encode('hradesin-voda/admin/v1');

const toB64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function deriveKey(password: string, salt: Uint8Array, iter: number) {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password.normalize('NFC')),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function seal(secret: string, password: string): Promise<Vault> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, ITERATIONS);
  const data = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv, additionalData: AAD },
    key,
    new TextEncoder().encode(secret),
  );
  return { v: 1, iter: ITERATIONS, salt: toB64(salt), iv: toB64(iv), data: toB64(new Uint8Array(data)) };
}

/** Vrátí token, nebo vyhodí chybu, když heslo nesedí (GCM to pozná). */
export async function unseal(vault: Vault, password: string): Promise<string> {
  const key = await deriveKey(password, fromB64(vault.salt), vault.iter);
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromB64(vault.iv), additionalData: AAD },
    key,
    fromB64(vault.data),
  );
  return new TextDecoder().decode(plain);
}
