import { LOCALE_REGISTRY } from './registry.js';

export const BCP47_TO_SLUG: Readonly<Record<string, string>> =
  Object.fromEntries(
    LOCALE_REGISTRY.map((entry) => [entry.bcp47, entry.slug]),
  );

export const SLUG_TO_BCP47: Readonly<Record<string, string>> =
  Object.fromEntries(
    LOCALE_REGISTRY.map((entry) => [entry.slug, entry.bcp47]),
  );

export function bcp47ToSlug(lang: string): string {
  return BCP47_TO_SLUG[lang] ?? lang.toLowerCase();
}

export function slugToBcp47(slug: string): string {
  return SLUG_TO_BCP47[slug] ?? slug;
}
