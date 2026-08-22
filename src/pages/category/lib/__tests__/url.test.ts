import { describe, expect, it } from 'vitest';

import { SEARCH_PARAMS_KEYS } from '../../config/searchParams';
import { normalizeSearchParams } from '../url';

describe('normalizeSearchParams', () => {
    it('returns URLSearchParams with string values', () => {
        const result = normalizeSearchParams({
            [SEARCH_PARAMS_KEYS.PAGE]: '2',
            [SEARCH_PARAMS_KEYS.SORT]: 'newest',
            [SEARCH_PARAMS_KEYS.QUERY]: 'keyboard',
        });

        expect(result.toString()).toBe('page=2&sort=newest&query=keyboard');
    });

    it('removes undefined and empty string values', () => {
        const result = normalizeSearchParams({
            [SEARCH_PARAMS_KEYS.PAGE]: undefined,
            [SEARCH_PARAMS_KEYS.SORT]: '',
            [SEARCH_PARAMS_KEYS.QUERY]: 'owl',
        });

        expect(result.toString()).toBe('query=owl');
    });

    it('expands array values into repeated query params', () => {
        const result = normalizeSearchParams({
            [SEARCH_PARAMS_KEYS.SORT]: ['popularity', 'newest'],
            [SEARCH_PARAMS_KEYS.QUERY]: 'mouse',
        });

        expect(result.getAll(SEARCH_PARAMS_KEYS.SORT)).toEqual(['popularity', 'newest']);
        expect(result.get(SEARCH_PARAMS_KEYS.QUERY)).toBe('mouse');
        expect(result.toString()).toBe('sort=popularity&sort=newest&query=mouse');
    });

    it('removes empty values from arrays', () => {
        const result = normalizeSearchParams({
            [SEARCH_PARAMS_KEYS.SORT]: ['', 'newest'],
            [SEARCH_PARAMS_KEYS.QUERY]: '',
        });

        expect(result.toString()).toBe('sort=newest');
    });
});
