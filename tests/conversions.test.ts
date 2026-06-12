import { describe, expect, it } from 'vitest';
import {
  BCP47_TO_SLUG,
  SLUG_TO_BCP47,
  bcp47ToSlug,
  slugToBcp47,
} from '../src/conversions.js';
import { LOCALE_REGISTRY } from '../src/registry.js';

describe('BCP47_TO_SLUG', () => {
  it('maps every registry BCP-47 code to its slug', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(BCP47_TO_SLUG[entry.bcp47]).toBe(entry.slug);
    }
  });
});

describe('SLUG_TO_BCP47', () => {
  it('maps every registry slug to its BCP-47 code', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(SLUG_TO_BCP47[entry.slug]).toBe(entry.bcp47);
    }
  });
});

describe('bcp47ToSlug', () => {
  it('converts known BCP-47 codes', () => {
    expect(bcp47ToSlug('pt-BR')).toBe('pt-br');
    expect(bcp47ToSlug('zh-CN')).toBe('zh-cn');
    expect(bcp47ToSlug('zh-TW')).toBe('zh-tw');
    expect(bcp47ToSlug('en')).toBe('en');
    expect(bcp47ToSlug('ar')).toBe('ar');
  });

  it('falls back to toLowerCase for unknown codes', () => {
    expect(bcp47ToSlug('sv-SE')).toBe('sv-se');
    expect(bcp47ToSlug('UNKNOWN')).toBe('unknown');
  });

  it('round-trips with slugToBcp47 for all registry entries', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(bcp47ToSlug(slugToBcp47(entry.slug))).toBe(entry.slug);
    }
  });
});

describe('slugToBcp47', () => {
  it('converts known slugs', () => {
    expect(slugToBcp47('pt-br')).toBe('pt-BR');
    expect(slugToBcp47('zh-cn')).toBe('zh-CN');
    expect(slugToBcp47('zh-tw')).toBe('zh-TW');
    expect(slugToBcp47('en')).toBe('en');
  });

  it('returns the slug unchanged for unknown values', () => {
    expect(slugToBcp47('xx-yy')).toBe('xx-yy');
  });
});
