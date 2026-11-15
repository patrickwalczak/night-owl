import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { StrictMode, type ComponentProps } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { CategoryPageProvider, useCategoryPageContext } from '../categoryPageContext';

afterEach(cleanup);

const initialProps = {
    category: { id: 'lighting', name: 'Lighting', slug: 'lighting', parentId: null, children: [] },
    parameters: [],
    productSum: 20,
    appliedFilters: { color: ['black'] },
    areFiltersOpen: true,
};

const Probe = () => {
    const { category, parameters, productSum, selectedFilters, areFiltersOpen, toggleFilters, setSelectedFilters }
        = useCategoryPageContext();

    return (
        <>
            <output data-testid={'snapshot'}>
                {JSON.stringify({ category, parameters, productSum, selectedFilters, areFiltersOpen })}
            </output>
            <button onClick={toggleFilters}>{'Toggle filters'}</button>
            <button onClick={() => setSelectedFilters({})}>{'Clear selection'}</button>
        </>
    );
};

const TestPage = (props: Omit<ComponentProps<typeof CategoryPageProvider>, 'children'>) => {
    return (
        <StrictMode>
            <CategoryPageProvider {...props}>
                <Probe />
            </CategoryPageProvider>
        </StrictMode>
    );
};

const snapshot = () => JSON.parse(screen.getByTestId('snapshot').textContent ?? '{}');

describe('CategoryPageProvider', () => {
    it('exposes fresh category and listing data when server props change', () => {
        const { rerender } = render(<TestPage {...initialProps} />);
        const nextProps = {
            ...initialProps,
            category: {
                id: 'outdoor', name: 'Outdoor', slug: 'outdoor', parentId: null,
                children: [{ id: 'lamps', name: 'Lamps', slug: 'lamps', _count: { products: 4 } }],
            },
            parameters: [{ id: 'size', name: 'Size', slug: 'size', values: [] }],
            productSum: 4,
        };

        rerender(<TestPage {...nextProps} />);

        expect(snapshot()).toMatchObject({
            category: nextProps.category,
            parameters: nextProps.parameters,
            productSum: 4,
        });
    });

    it('preserves panel state and cleared selection on server rerenders until applied filters change', () => {
        const { rerender } = render(<TestPage {...initialProps} />);

        expect(snapshot().areFiltersOpen).toBe(true);
        fireEvent.click(screen.getByRole('button', { name: 'Toggle filters' }));
        fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
        rerender(<TestPage {...initialProps} productSum={40} appliedFilters={{ color: ['black'] }} />);

        expect(snapshot()).toMatchObject({ areFiltersOpen: false, selectedFilters: {}, productSum: 40 });

        rerender(<TestPage {...initialProps} appliedFilters={{ color: ['white'] }} />);

        expect(snapshot()).toMatchObject({ areFiltersOpen: false, selectedFilters: { color: ['white'] } });
    });
});
