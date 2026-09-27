import { describe, expect, it } from 'vitest';

import categoryListingReducer, { setFilterValue, setSelectedFilters } from '../categoryListingSlice';

describe('selectedFilters', () => {
    it('adds values once and removes only the unchecked value', () => {
        const initial = categoryListingReducer(undefined, setSelectedFilters({ color: ['black'], size: ['large'] }));
        const checkWhite = setFilterValue({ parameterSlug: 'color', parameterValueSlug: 'white', checked: true });
        const withWhite = categoryListingReducer(initial, checkWhite);

        expect(withWhite.selectedFilters).toEqual({ color: ['black', 'white'], size: ['large'] });
        expect(categoryListingReducer(withWhite, checkWhite)).toBe(withWhite);

        const withoutBlack = categoryListingReducer(withWhite, setFilterValue({
            parameterSlug: 'color', parameterValueSlug: 'black', checked: false,
        }));

        expect(withoutBlack.selectedFilters).toEqual({ color: ['white'], size: ['large'] });

        const withoutColor = categoryListingReducer(withoutBlack, setFilterValue({
            parameterSlug: 'color', parameterValueSlug: 'white', checked: false,
        }));

        expect(withoutColor.selectedFilters).toEqual({ size: ['large'] });
    });

    it('ignores unchecking a missing value or parameter', () => {
        const initial = categoryListingReducer(undefined, setSelectedFilters({ color: ['black'] }));

        for (const parameterSlug of ['color', 'size']) {
            expect(categoryListingReducer(initial, setFilterValue({
                parameterSlug, parameterValueSlug: 'missing', checked: false,
            }))).toBe(initial);
        }
    });

    it('replaces the entire selection when syncing applied filters', () => {
        const initial = categoryListingReducer(undefined, setSelectedFilters({ color: ['black'], size: ['large'] }));
        const replaced = categoryListingReducer(initial, setSelectedFilters({ color: ['white'] }));

        expect(replaced.selectedFilters).toEqual({ color: ['white'] });
        expect(categoryListingReducer(replaced, setSelectedFilters({})).selectedFilters).toEqual({});
    });
});
