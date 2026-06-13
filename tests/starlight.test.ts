import { describe, expect, it } from 'vitest';
import { LOCALE_REGISTRY } from '../src/registry.js';
import { toStarlightLocales } from '../src/starlight.js';

describe('toStarlightLocales', () => {
  const result = toStarlightLocales();

  it('returns an object keyed by slugs', () => {
    const keys = Object.keys(result);
    const slugs = LOCALE_REGISTRY.map((e) => e.slug);
    expect(keys).toEqual(slugs);
  });

  it('has label and lang for every locale', () => {
    for (const [slug, config] of Object.entries(result)) {
      expect(config.label).toBeTruthy();
      expect(config.lang).toBeTruthy();
    }
  });

  it('uses BCP-47 for the lang property', () => {
    expect(result['pt-br'].lang).toBe('pt-BR');
    expect(result['zh-cn'].lang).toBe('zh-CN');
    expect(result['zh-tw'].lang).toBe('zh-TW');
    expect(result.en.lang).toBe('en');
  });

  it('includes dir only for RTL locales', () => {
    expect(result.ar.dir).toBe('rtl');
    expect(result.en.dir).toBeUndefined();
    expect(result.fr.dir).toBeUndefined();
  });

  it('matches the shape docs-theme expects', () => {
    expect(result['pt-br']).toEqual({
      label: 'Português (Brasil)',
      lang: 'pt-BR',
    });
    expect(result.ar).toEqual({
      label: 'العربية',
      lang: 'ar',
      dir: 'rtl',
    });
  });
});
