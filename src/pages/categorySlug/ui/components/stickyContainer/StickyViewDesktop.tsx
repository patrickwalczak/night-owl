'use client';

import { mergeClasses } from '@/utils/mergeClasses';

import SideFiltersButton from '../../sections/filtering/ui/sideFiltersButton/SideFiltersButton';
import SortDropdown from '../../sections/sorting/ui/sortDropdown/SortDropdown';
import CategoryName from '../categoryName/CategoryName';
import StickyContainer from './StickyContainer';

const StickyViewDesktop = () => {
    return (
        <StickyContainer>
            {({ isStuck }) => (
                <>
                    <CategoryName isStuck={isStuck} isProductSum />
                    <div className={mergeClasses('flex', 'align-center', 'gap-050')}>
                        <SideFiltersButton />
                        <SortDropdown />
                    </div>
                </>
            )}
        </StickyContainer>
    );
};

export default StickyViewDesktop;
