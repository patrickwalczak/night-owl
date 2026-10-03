'use client';

import SideFiltersButton from '../../sections/filtering/ui/sideFilters/SideFiltersButton';
import CategoryName from '../../sections/header/ui/categoryName/CategoryName';

export const StickyBarWide = ({ isStuck }: { isStuck: boolean }) => {
    return (
        <div className={'flex align-center justify-between'} style={{ columnGap: '1rem' }}>
            <CategoryName isStuck={isStuck} isProductSum />
            <SideFiltersButton />
        </div>
    );
};
