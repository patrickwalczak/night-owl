'use client';

import SideFiltersButton from '../../sections/filtering/ui/sideFiltersButton/SideFiltersButton';
import CategoryName from '../categoryName/CategoryName';
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
