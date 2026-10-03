'use client';

import SideFiltersButton from '../../sections/filtering/ui/sideFilters/SideFiltersButton';
import CategoryName from '../../sections/header/ui/categoryName/CategoryName';
import StickyContainer from './StickyContainer';

export const StickyBarWide = () => {
    return (
        <StickyContainer>
            {({ isStuck }) => (
                <>
                    <CategoryName isStuck={isStuck} isProductSum />
                    <SideFiltersButton />
                </>
            )}
        </StickyContainer>
    );
};
