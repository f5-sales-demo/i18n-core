import { VALID_SLUGS } from './slugs.js';

export const SCRIPT_SUBTAG_MAP: Readonly<Record<string, string>> = {
  'zh-hans': 'zh-cn',
  'zh-hant': 'zh-tw',
};

export function normalizeLocale(raw: string): string {
  return raw.toLowerCase().replace(/_/g, '-').split('.')[0];
}

export function mapToSupportedLocale(osLocale: string): string | undefined {
  const normalized = normalizeLocale(osLocale);

  if (VALID_SLUGS.has(normalized)) return normalized;

  for (const [subtag, slug] of Object.entries(SCRIPT_SUBTAG_MAP)) {
    if (normalized.startsWith(subtag)) return VALID_SLUGS.has(slug) ? slug : undefined;
  }

  const withRegion = normalized.split('-').slice(0, 2).join('-');
  if (VALID_SLUGS.has(withRegion)) return withRegion;

  const base = normalized.split('-')[0];
  if (VALID_SLUGS.has(base)) return base;

  return undefined;
}
