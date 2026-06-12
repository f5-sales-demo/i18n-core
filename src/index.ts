export { LOCALE_REGISTRY, DEFAULT_LOCALE } from './registry.js';
export type { LocaleEntry } from './registry.js';

export { VALID_SLUGS, SLUG_LIST, isValidSlug } from './slugs.js';

export {
  BCP47_TO_SLUG,
  SLUG_TO_BCP47,
  bcp47ToSlug,
  slugToBcp47,
} from './conversions.js';

export {
  LOCALE_DISPLAY_NAMES,
  LOCALE_NATIVE_NAMES,
  getLocaleDisplayName,
} from './display-names.js';

export {
  SCRIPT_SUBTAG_MAP,
  normalizeLocale,
  mapToSupportedLocale,
} from './normalize.js';

export { toStarlightLocales } from './starlight.js';
export type { StarlightLocaleConfig } from './starlight.js';
