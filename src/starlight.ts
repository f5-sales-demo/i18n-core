import { LOCALE_REGISTRY } from './registry.js';

export interface StarlightLocaleConfig {
  label: string;
  lang: string;
  dir?: 'rtl';
}

export function toStarlightLocales(): Record<string, StarlightLocaleConfig> {
  return Object.fromEntries(
    LOCALE_REGISTRY.map((entry) => [
      entry.slug,
      {
        label: entry.label,
        lang: entry.bcp47,
        ...(entry.dir ? { dir: entry.dir } : {}),
      },
    ]),
  );
}
