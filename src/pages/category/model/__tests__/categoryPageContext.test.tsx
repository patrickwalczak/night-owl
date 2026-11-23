import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { StrictMode, type ComponentProps } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { CategoryPageProvider, useCategoryPageContext } from '../categoryPageContext';

afterEach(cleanup);

const initialProps = {
    categoryId: 'lighting',
    appliedFilters: { color: ['black'] },
    areFiltersOpen: true,
};

const Probe = () => {
    const { selectedFilters, areFiltersOpen, toggleFilters, setSelectedFilters }
        = useCategoryPageContext();

    return (
        <>
            <output data-testid={'snapshot'}>
                {JSON.stringify({ selectedFilters, areFiltersOpen })}
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
    it('restores applied filters when the category identity changes', () => {
        const { rerender } = render(<TestPage {...initialProps} />);
        fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
        expect(snapshot().selectedFilters).toEqual({});

        rerender(<TestPage {...initialProps} categoryId={'outdoor'} />);

        expect(snapshot()).toMatchObject({
            selectedFilters: initialProps.appliedFilters,
            areFiltersOpen: true,
        });
    });

    it('preserves panel state and cleared selection on server rerenders until applied filters change', () => {
        const { rerender } = render(<TestPage {...initialProps} />);

        expect(snapshot().areFiltersOpen).toBe(true);
        fireEvent.click(screen.getByRole('button', { name: 'Toggle filters' }));
        fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
        rerender(
            <TestPage
                {...initialProps}
                appliedFilters={{ color: ['black'] }}
            />,
        );

        expect(snapshot()).toMatchObject({
            areFiltersOpen: false,
            selectedFilters: {},
        });

        rerender(<TestPage {...initialProps} appliedFilters={{ color: ['white'] }} />);

        expect(snapshot()).toMatchObject({ areFiltersOpen: false, selectedFilters: { color: ['white'] } });
    });
});
