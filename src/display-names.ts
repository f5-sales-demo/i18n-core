import { LOCALE_REGISTRY } from './registry.js';

export const LOCALE_DISPLAY_NAMES: Readonly<Record<string, string>> = Object.fromEntries(
  LOCALE_REGISTRY.map((entry) => [entry.slug, entry.labelEn]),
);

export const LOCALE_NATIVE_NAMES: Readonly<Record<string, string>> = Object.fromEntries(
  LOCALE_REGISTRY.map((entry) => [entry.slug, entry.label]),
);

export function getLocaleDisplayName(locale: string): string | undefined {
  const normalized = locale.toLowerCase().replace(/_/g, '-').split('.')[0];
  return LOCALE_DISPLAY_NAMES[normalized];
}
