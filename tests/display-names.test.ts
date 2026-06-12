import { describe, expect, it } from 'vitest';
import {
  LOCALE_DISPLAY_NAMES,
  LOCALE_NATIVE_NAMES,
  getLocaleDisplayName,
} from '../src/display-names.js';
import { LOCALE_REGISTRY } from '../src/registry.js';

describe('LOCALE_DISPLAY_NAMES', () => {
  it('has an entry for every slug', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(LOCALE_DISPLAY_NAMES[entry.slug]).toBe(entry.labelEn);
    }
  });

  it('matches the xcsh LOCALE_DISPLAY_NAMES values', () => {
    expect(LOCALE_DISPLAY_NAMES['ar']).toBe('Arabic');
    expect(LOCALE_DISPLAY_NAMES['pt-br']).toBe('Brazilian Portuguese');
    expect(LOCALE_DISPLAY_NAMES['zh-cn']).toBe('Simplified Chinese');
    expect(LOCALE_DISPLAY_NAMES['zh-tw']).toBe('Traditional Chinese');
    expect(LOCALE_DISPLAY_NAMES['ja']).toBe('Japanese');
  });
});

describe('LOCALE_NATIVE_NAMES', () => {
  it('has an entry for every slug', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(LOCALE_NATIVE_NAMES[entry.slug]).toBe(entry.label);
    }
  });

  it('returns native script labels', () => {
    expect(LOCALE_NATIVE_NAMES['ja']).toBe('日本語');
    expect(LOCALE_NATIVE_NAMES['ar']).toBe('العربية');
    expect(LOCALE_NATIVE_NAMES['zh-cn']).toBe('简体中文');
  });
});

describe('getLocaleDisplayName', () => {
  it('returns English name for a slug', () => {
    expect(getLocaleDisplayName('pt-br')).toBe('Brazilian Portuguese');
  });

  it('normalizes underscore-separated input', () => {
    expect(getLocaleDisplayName('pt_BR')).toBe('Brazilian Portuguese');
  });

  it('normalizes input with encoding suffix', () => {
    expect(getLocaleDisplayName('zh_CN.UTF-8')).toBe('Simplified Chinese');
  });

  it('returns undefined for unknown locales', () => {
    expect(getLocaleDisplayName('xx')).toBeUndefined();
  });
});
