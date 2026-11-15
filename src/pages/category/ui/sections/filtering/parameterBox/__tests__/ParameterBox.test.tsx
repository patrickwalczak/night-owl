import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { CategoryPageCategory, CategoryParameter } from '@/pages/category/model/categoryPage.types';
import type { ParsedFilters } from '@/pages/category/model/params/searchParams.types';

import CategoryPageStoreProvider from '@/pages/category/model/store/CategoryPageStoreProvider';
import { useCategoryPageSelector } from '@/pages/category/model/store/client';

import { ParameterBox } from '../ParameterBox';

afterEach(cleanup);

const category: CategoryPageCategory = {
    id: 'lighting', name: 'Lighting', slug: 'lighting', parentId: null, children: [],
};
const parameter: CategoryParameter = {
    id: 'color', name: 'Color', slug: 'color',
    values: [
        { id: 'black', value: 'Black', slug: 'black', count: 1 },
        { id: 'white', value: 'White', slug: 'white', count: 1 },
    ],
};

const SelectionPreview = () => {
    const selectedFilters = useCategoryPageSelector(state => state.categoryListing.selectedFilters);

    return <output data-testid={'selected-filters'}>{JSON.stringify(selectedFilters)}</output>;
};

interface TestCategoryType {
    selectedFilters: ParsedFilters;
    categoryId?: string;
    page?: number;
    showParameters?: boolean;
}

const TestCategory = ({ selectedFilters, categoryId = category.id, page = 1, showParameters = true }: TestCategoryType) => (
    <CategoryPageStoreProvider
        category={{ ...category, id: categoryId }}
        parameters={[parameter]}
        selectedFilters={selectedFilters}
        initialProducts={{ items: [], nextPage: null, total: 0, totalPages: 1, pageSize: 20, page }}
        areFiltersOpen
    >
        <SelectionPreview />
        {showParameters && <ParameterBox parameter={parameter} />}
    </CategoryPageStoreProvider>
);

const checkbox = (name: string) => screen.getByLabelText(name) as HTMLInputElement;
const selection = () => JSON.parse(screen.getByTestId('selected-filters').textContent ?? '{}');
const openParameter = () => fireEvent.click(screen.getByRole('button', { name: 'Color' }));

describe('ParameterBox selection', () => {
    it('initializes from applied filters and updates the store on check and uncheck', () => {
        render(<TestCategory selectedFilters={{ color: ['black'] }} />);
        openParameter();

        expect(checkbox('Black').checked).toBe(true);
        expect(checkbox('White').checked).toBe(false);

        fireEvent.click(checkbox('Black'));

        expect(checkbox('Black').checked).toBe(false);
        expect(selection()).toEqual({});

        fireEvent.click(checkbox('White'));

        expect(checkbox('White').checked).toBe(true);
        expect(selection()).toEqual({ color: ['white'] });
    });

    it('restores draft checkboxes when the filter UI is remounted', () => {
        const { rerender } = render(<TestCategory selectedFilters={{}} />);
        openParameter();
        fireEvent.click(checkbox('Black'));

        rerender(<TestCategory selectedFilters={{}} showParameters={false} />);
        rerender(<TestCategory selectedFilters={{}} />);

        expect(checkbox('Black').checked).toBe(true);
        expect(selection()).toEqual({ color: ['black'] });
    });

    it('follows changed applied filters, including navigation back and clearing filters', () => {
        const { rerender } = render(<TestCategory selectedFilters={{ color: ['black'] }} />);

        rerender(<TestCategory selectedFilters={{ color: ['white'] }} />);

        expect(checkbox('Black').checked).toBe(false);
        expect(checkbox('White').checked).toBe(true);
        expect(selection()).toEqual({ color: ['white'] });

        rerender(<TestCategory selectedFilters={{ color: ['black'] }} />);

        expect(checkbox('Black').checked).toBe(true);
        expect(checkbox('White').checked).toBe(false);

        rerender(<TestCategory selectedFilters={{}} />);

        expect(checkbox('Black').checked).toBe(false);
        expect(selection()).toEqual({});
    });

    it('preserves draft edits on pagination when applied filters only change object or ordering', () => {
        const { rerender } = render(<TestCategory selectedFilters={{ color: ['black', 'white'], size: ['large'] }} />);
        openParameter();
        fireEvent.click(checkbox('Black'));

        rerender(<TestCategory selectedFilters={{ size: ['large'], color: ['white', 'black'] }} page={2} />);

        expect(checkbox('Black').checked).toBe(false);
        expect(checkbox('White').checked).toBe(true);
        expect(selection()).toEqual({ color: ['white'], size: ['large'] });
    });

    it('resets draft selection on a category change even when applied filters are the same', () => {
        const { rerender } = render(<TestCategory selectedFilters={{}} />);
        openParameter();
        fireEvent.click(checkbox('Black'));

        rerender(<TestCategory selectedFilters={{}} categoryId={'furniture'} />);

        expect(checkbox('Black').checked).toBe(false);
        expect(selection()).toEqual({});
    });
});
