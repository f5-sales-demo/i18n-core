export interface LocaleEntry {
  bcp47: string;
  slug: string;
  label: string;
  labelEn: string;
  dir?: 'rtl';
}

export const LOCALE_REGISTRY: readonly LocaleEntry[] = [
  { bcp47: 'en', slug: 'en', label: 'English', labelEn: 'English' },
  { bcp47: 'fr', slug: 'fr', label: 'Français', labelEn: 'French' },
  { bcp47: 'es', slug: 'es', label: 'Español', labelEn: 'Spanish' },
  { bcp47: 'de', slug: 'de', label: 'Deutsch', labelEn: 'German' },
  { bcp47: 'pt-BR', slug: 'pt-br', label: 'Português (Brasil)', labelEn: 'Brazilian Portuguese' },
  { bcp47: 'ja', slug: 'ja', label: '日本語', labelEn: 'Japanese' },
  { bcp47: 'ko', slug: 'ko', label: '한국어', labelEn: 'Korean' },
  { bcp47: 'zh-CN', slug: 'zh-cn', label: '简体中文', labelEn: 'Simplified Chinese' },
  { bcp47: 'zh-TW', slug: 'zh-tw', label: '繁體中文', labelEn: 'Traditional Chinese' },
  { bcp47: 'ar', slug: 'ar', label: 'العربية', labelEn: 'Arabic', dir: 'rtl' },
  { bcp47: 'it', slug: 'it', label: 'Italiano', labelEn: 'Italian' },
  { bcp47: 'hi', slug: 'hi', label: 'हिन्दी', labelEn: 'Hindi' },
  { bcp47: 'th', slug: 'th', label: 'ไทย', labelEn: 'Thai' },
] as const;

export const DEFAULT_LOCALE = 'en';
