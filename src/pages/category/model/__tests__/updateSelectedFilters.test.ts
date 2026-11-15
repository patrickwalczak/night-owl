import { describe, expect, it } from 'vitest';

import { updateSelectedFilters } from '../updateSelectedFilters';

describe('updateSelectedFilters', () => {
    it('adds values once and removes only the unchecked value without mutating the source', () => {
        const initial = { color: ['black'], size: ['large'] };
        const checkWhite = { parameterSlug: 'color', parameterValueSlug: 'white', checked: true };
        const withWhite = updateSelectedFilters(initial, checkWhite);

        expect(withWhite).toEqual({ color: ['black', 'white'], size: ['large'] });
        expect(initial).toEqual({ color: ['black'], size: ['large'] });
        expect(updateSelectedFilters(withWhite, checkWhite)).toBe(withWhite);

        const withoutBlack = updateSelectedFilters(withWhite, {
            parameterSlug: 'color', parameterValueSlug: 'black', checked: false,
        });

        expect(withoutBlack).toEqual({ color: ['white'], size: ['large'] });

        expect(updateSelectedFilters(withoutBlack, {
            parameterSlug: 'color', parameterValueSlug: 'white', checked: false,
        })).toEqual({ size: ['large'] });
    });

    it('ignores unchecking a missing value or parameter', () => {
        const initial = { color: ['black'] };

        for (const parameterSlug of ['color', 'size']) {
            expect(updateSelectedFilters(initial, {
                parameterSlug, parameterValueSlug: 'missing', checked: false,
            })).toBe(initial);
        }
    });

    it('handles filter names matching Object prototype properties', () => {
        expect(updateSelectedFilters({}, {
            parameterSlug: 'constructor', parameterValueSlug: 'black', checked: true,
        })).toEqual({ constructor: ['black'] });
    });
});
