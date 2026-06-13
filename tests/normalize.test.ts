import { describe, expect, it } from 'vitest';
import { mapToSupportedLocale, normalizeLocale, SCRIPT_SUBTAG_MAP } from '../src/normalize.js';

describe('normalizeLocale', () => {
  it('lowercases and replaces underscores with hyphens', () => {
    expect(normalizeLocale('pt_BR')).toBe('pt-br');
    expect(normalizeLocale('zh_CN')).toBe('zh-cn');
    expect(normalizeLocale('EN_US')).toBe('en-us');
  });

  it('strips encoding suffix', () => {
    expect(normalizeLocale('pt_BR.UTF-8')).toBe('pt-br');
    expect(normalizeLocale('en_US.utf8')).toBe('en-us');
    expect(normalizeLocale('ja.UTF-8')).toBe('ja');
  });

  it('handles already-normalized input', () => {
    expect(normalizeLocale('pt-br')).toBe('pt-br');
    expect(normalizeLocale('en')).toBe('en');
  });
});

describe('SCRIPT_SUBTAG_MAP', () => {
  it('maps zh-hans to zh-cn', () => {
    expect(SCRIPT_SUBTAG_MAP['zh-hans']).toBe('zh-cn');
  });

  it('maps zh-hant to zh-tw', () => {
    expect(SCRIPT_SUBTAG_MAP['zh-hant']).toBe('zh-tw');
  });
});

describe('mapToSupportedLocale', () => {
  it('returns exact slug matches', () => {
    expect(mapToSupportedLocale('en')).toBe('en');
    expect(mapToSupportedLocale('pt-br')).toBe('pt-br');
    expect(mapToSupportedLocale('zh-cn')).toBe('zh-cn');
  });

  it('normalizes before matching', () => {
    expect(mapToSupportedLocale('pt_BR')).toBe('pt-br');
    expect(mapToSupportedLocale('zh_CN.UTF-8')).toBe('zh-cn');
    expect(mapToSupportedLocale('EN')).toBe('en');
  });

  it('handles Apple script subtags', () => {
    expect(mapToSupportedLocale('zh-Hans')).toBe('zh-cn');
    expect(mapToSupportedLocale('zh-Hant')).toBe('zh-tw');
    expect(mapToSupportedLocale('zh-Hans-CN')).toBe('zh-cn');
    expect(mapToSupportedLocale('zh-Hant-TW')).toBe('zh-tw');
  });

  it('falls back to base language', () => {
    expect(mapToSupportedLocale('en-US')).toBe('en');
    expect(mapToSupportedLocale('en-GB')).toBe('en');
    expect(mapToSupportedLocale('fr-CA')).toBe('fr');
    expect(mapToSupportedLocale('de-AT')).toBe('de');
  });

  it('returns undefined for unsupported locales', () => {
    expect(mapToSupportedLocale('sv')).toBeUndefined();
    expect(mapToSupportedLocale('xx-YY')).toBeUndefined();
    expect(mapToSupportedLocale('ru')).toBeUndefined();
  });

  it('handles edge cases', () => {
    expect(mapToSupportedLocale('')).toBeUndefined();
    expect(mapToSupportedLocale('c')).toBeUndefined();
  });
});
