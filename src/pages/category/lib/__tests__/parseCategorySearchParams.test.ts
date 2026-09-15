import { describe, expect, it } from 'vitest';

import { DEFAULT_SORT_ORDER } from '../../config/searchParams';
import { normalizeSearchParams, parseCategorySearchParams } from '../url';

describe('parseCategorySearchParams', () => {
    it('returns defaults and empty filters for an empty URL', () => {
        expect(parseCategorySearchParams(new URLSearchParams())).toEqual({
            page: 1,
            sort: DEFAULT_SORT_ORDER,
            query: '',
            filters: {},
        });
    });

    it('keeps system params separate from grouped filter values', () => {
        const result = parseCategorySearchParams(new URLSearchParams(
            'page=3&sort=newest&query=lamp&color=black&color=white&socket=e27',
        ));

        expect(result).toEqual({
            page: 3,
            sort: 'newest',
            query: 'lamp',
            filters: {
                color: ['black', 'white'],
                socket: ['e27'],
            },
        });
    });

    it.each(['0', '-1', '1.5', 'invalid', 'Infinity', ''])('defaults invalid page %j to page 1', (page) => {
        const result = parseCategorySearchParams(new URLSearchParams({ page, sort: 'invalid' }));

        expect(result.page).toBe(1);
        expect(result.sort).toBe(DEFAULT_SORT_ORDER);
    });

    it('uses the first value of repeated system params', () => {
        const result = parseCategorySearchParams(new URLSearchParams(
            'page=2&page=3&sort=newest&sort=popularity&query=lamp&query=chair',
        ));

        expect(result).toEqual({ page: 2, sort: 'newest', query: 'lamp', filters: {} });
    });

    it('ignores empty filter names and values', () => {
        const result = parseCategorySearchParams(new URLSearchParams('=black&color=&color=white&socket='));

        expect(result.filters).toEqual({ color: ['white'] });
    });

    it('deduplicates filter values while preserving their order', () => {
        const result = parseCategorySearchParams(new URLSearchParams('color=black&color=white&color=black'));

        expect(result.filters).toEqual({ color: ['black', 'white'] });
    });

    it('handles filter names matching Object prototype properties', () => {
        const result = parseCategorySearchParams(new URLSearchParams(
            'constructor=red&constructor=blue&toString=metal&__proto__=white&__proto__=white',
        ));

        expect(result.filters).toEqual({
            constructor: ['red', 'blue'],
            toString: ['metal'],
            ['__proto__']: ['white'],
        });
        expect(Object.getPrototypeOf(result.filters)).toBe(Object.prototype);
    });

    it('parses raw and normalized filter params consistently', () => {
        const raw = new URLSearchParams('color=&color=black&color=black&socket=');
        const normalized = normalizeSearchParams({ color: ['', 'black', 'black'], socket: '' });

        expect(parseCategorySearchParams(raw)).toEqual(parseCategorySearchParams(normalized));
    });
});
