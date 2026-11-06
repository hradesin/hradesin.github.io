import { seal, type Vault } from './vault';

/**
 * Šifrovaný admin token pro tento build (secrets ADMIN_TOKEN + ADMIN_PASSWORD).
 * Spočítá se jednou za build; bez secrets vrací null.
 */
let cached: Promise<Vault | null> | undefined;

export function getVault(): Promise<Vault | null> {
  const { ADMIN_TOKEN, ADMIN_PASSWORD } = process.env;
  cached ??= ADMIN_TOKEN && ADMIN_PASSWORD ? seal(ADMIN_TOKEN.trim(), ADMIN_PASSWORD) : Promise.resolve(null);
  return cached;
}
