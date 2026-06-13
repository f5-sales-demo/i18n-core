import { describe, expect, it } from 'vitest';
import { LOCALE_REGISTRY } from '../src/registry.js';
import { isValidSlug, SLUG_LIST, VALID_SLUGS } from '../src/slugs.js';

describe('VALID_SLUGS', () => {
  it('contains all registry slugs', () => {
    for (const entry of LOCALE_REGISTRY) {
      expect(VALID_SLUGS.has(entry.slug)).toBe(true);
    }
  });

  it('has the same size as the registry', () => {
    expect(VALID_SLUGS.size).toBe(LOCALE_REGISTRY.length);
  });
});

describe('SLUG_LIST', () => {
  it('is an array of all slugs in registry order', () => {
    expect(SLUG_LIST).toEqual(LOCALE_REGISTRY.map((e) => e.slug));
  });
});

describe('isValidSlug', () => {
  it('returns true for valid slugs', () => {
    expect(isValidSlug('en')).toBe(true);
    expect(isValidSlug('pt-br')).toBe(true);
    expect(isValidSlug('zh-cn')).toBe(true);
    expect(isValidSlug('ar')).toBe(true);
  });

  it('returns false for invalid slugs', () => {
    expect(isValidSlug('pt-BR')).toBe(false);
    expect(isValidSlug('zh-CN')).toBe(false);
    expect(isValidSlug('sv')).toBe(false);
    expect(isValidSlug('')).toBe(false);
  });
});
