import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { CategoryParameter } from '../../../../../model/categoryPage.types';
import type { ParsedFilters } from '../../../../../model/params/searchParams.types';

import { CategoryPageProvider, useCategoryPageContext } from '../../../../../model/categoryPageContext';
import { ParameterBox } from '../ParameterBox';

afterEach(cleanup);

const initialCategoryId = 'lighting';
const parameter: CategoryParameter = {
    id: 'color', name: 'Color', slug: 'color',
    values: [
        { id: 'black', value: 'Black', slug: 'black', count: 1 },
        { id: 'white', value: 'White', slug: 'white', count: 1 },
    ],
};

const SelectionPreview = () => {
    const { selectedFilters } = useCategoryPageContext();

    return <output data-testid={'selected-filters'}>{JSON.stringify(selectedFilters)}</output>;
};

interface TestCategoryType {
    appliedFilters: ParsedFilters;
    categoryId?: string;
    page?: number;
    showParameters?: boolean;
}

const TestCategory = ({ appliedFilters, categoryId = initialCategoryId, page = 1, showParameters = true }: TestCategoryType) => (
    <CategoryPageProvider
        categoryId={categoryId}
        appliedFilters={appliedFilters}
        areFiltersOpen
    >
        <SelectionPreview />
        <output data-testid={'page'}>{page}</output>
        {showParameters && <ParameterBox parameter={parameter} />}
    </CategoryPageProvider>
);

const checkbox = (name: string) => screen.getByLabelText(name) as HTMLInputElement;
const selection = () => JSON.parse(screen.getByTestId('selected-filters').textContent ?? '{}');
const openParameter = () => fireEvent.click(screen.getByRole('button', { name: 'Color' }));

describe('ParameterBox selection', () => {
    it('initializes from applied filters and updates the selection on check and uncheck', () => {
        render(<TestCategory appliedFilters={{ color: ['black'] }} />);
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

    it('restores selected checkboxes when the filter UI is remounted', () => {
        const { rerender } = render(<TestCategory appliedFilters={{}} />);
        openParameter();
        fireEvent.click(checkbox('Black'));

        rerender(<TestCategory appliedFilters={{}} showParameters={false} />);
        rerender(<TestCategory appliedFilters={{}} />);

        expect(checkbox('Black').checked).toBe(true);
        expect(selection()).toEqual({ color: ['black'] });
    });

    it('follows changed applied filters, including navigation back and clearing filters', () => {
        const { rerender } = render(<TestCategory appliedFilters={{ color: ['black'] }} />);

        rerender(<TestCategory appliedFilters={{ color: ['white'] }} />);

        expect(checkbox('Black').checked).toBe(false);
        expect(checkbox('White').checked).toBe(true);
        expect(selection()).toEqual({ color: ['white'] });

        rerender(<TestCategory appliedFilters={{ color: ['black'] }} />);

        expect(checkbox('Black').checked).toBe(true);
        expect(checkbox('White').checked).toBe(false);

        rerender(<TestCategory appliedFilters={{}} />);

        expect(checkbox('Black').checked).toBe(false);
        expect(selection()).toEqual({});
    });

    it('preserves unapplied filter changes on pagination when applied filters only change object or ordering', () => {
        const { rerender } = render(<TestCategory appliedFilters={{ color: ['black', 'white'], size: ['large'] }} />);
        openParameter();
        fireEvent.click(checkbox('Black'));

        rerender(<TestCategory appliedFilters={{ size: ['large'], color: ['white', 'black'] }} page={2} />);

        expect(screen.getByTestId('page').textContent).toBe('2');
        expect(checkbox('Black').checked).toBe(false);
        expect(checkbox('White').checked).toBe(true);
        expect(selection()).toEqual({ color: ['white'], size: ['large'] });
    });

    it('resets filter selection on a category change even when applied filters are the same', () => {
        const { rerender } = render(<TestCategory appliedFilters={{}} />);
        openParameter();
        fireEvent.click(checkbox('Black'));

        rerender(<TestCategory appliedFilters={{}} categoryId={'furniture'} />);

        expect(checkbox('Black').checked).toBe(false);
        expect(selection()).toEqual({});
    });
});
