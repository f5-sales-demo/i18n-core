export { BCP47_TO_SLUG, SLUG_TO_BCP47, bcp47ToSlug, slugToBcp47 } from './conversions.js';
export { LOCALE_DISPLAY_NAMES, LOCALE_NATIVE_NAMES, getLocaleDisplayName } from './display-names.js';
export { SCRIPT_SUBTAG_MAP, mapToSupportedLocale, normalizeLocale } from './normalize.js';
export { DEFAULT_LOCALE, LOCALE_REGISTRY } from './registry.js';
export type { LocaleEntry } from './registry.js';
export { SLUG_LIST, VALID_SLUGS, isValidSlug } from './slugs.js';
export { toStarlightLocales } from './starlight.js';
export type { StarlightLocaleConfig } from './starlight.js';
