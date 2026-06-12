import { LOCALE_REGISTRY } from './registry.js';

export const VALID_SLUGS: ReadonlySet<string> = new Set(
  LOCALE_REGISTRY.map((entry) => entry.slug),
);

export const SLUG_LIST: readonly string[] = LOCALE_REGISTRY.map(
  (entry) => entry.slug,
);

export function isValidSlug(slug: string): boolean {
  return VALID_SLUGS.has(slug);
}
