import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALE_REGISTRY } from '../src/registry.js';

describe('LOCALE_REGISTRY', () => {
  it('contains 13 locales', () => {
    expect(LOCALE_REGISTRY).toHaveLength(13);
  });

  it('has no duplicate slugs', () => {
    const slugs = LOCALE_REGISTRY.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has no duplicate BCP-47 codes', () => {
    const codes = LOCALE_REGISTRY.map((e) => e.bcp47);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('uses lowercase slugs with hyphens only', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(entry.slug).toMatch(/^[a-z]+(-[a-z]+)?$/);
    }
  });

  it('derives slugs from BCP-47 via toLowerCase', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(entry.slug).toBe(entry.bcp47.toLowerCase());
    }
  });

  it('uses correct BCP-47 casing (lowercase language, uppercase region)', () => {
    for (const entry of LOCALE_REGISTRY) {
      const parts = entry.bcp47.split('-');
      expect(parts[0]).toBe(parts[0].toLowerCase());
      if (parts[1]) {
        expect(parts[1]).toBe(parts[1].toUpperCase());
      }
    }
  });

  it('marks only Arabic as RTL', () => {
    const rtl = LOCALE_REGISTRY.filter((e) => e.dir === 'rtl');
    expect(rtl).toHaveLength(1);
    expect(rtl[0].bcp47).toBe('ar');
  });

  it('has non-empty labels for every entry', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(entry.label.length).toBeGreaterThan(0);
      expect(entry.labelEn.length).toBeGreaterThan(0);
    }
  });
});

describe('DEFAULT_LOCALE', () => {
  it('is "en"', () => {
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('exists in the registry', () => {
    expect(LOCALE_REGISTRY.some((e) => e.slug === DEFAULT_LOCALE)).toBe(true);
  });
});
