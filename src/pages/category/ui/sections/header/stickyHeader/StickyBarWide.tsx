'use client';

import type { ReactNode } from 'react';

import { SideFiltersButton } from '../../filtering/sideFilters/SideFiltersButton';
import { CategoryName } from '../categoryName/CategoryName';

export const StickyBarWide = ({ isStuck, productCount }: { isStuck: boolean; productCount: ReactNode }) => {
    return (
        <div className={'flex align-center justify-between'} style={{ columnGap: '1rem' }}>
            <CategoryName isStuck={isStuck} productCount={productCount} />
            <SideFiltersButton />
        </div>
    );
};
