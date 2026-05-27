'use client';

import { mergeClasses } from '@/utils/mergeClasses';
import SideFiltersButton from '../../sections/filtering/ui/sideFiltersButton/SideFiltersButton';
import CategoryName from '../categoryName/CategoryName';
import SortDropdown from '../../sections/sorting/ui/sortDropdown/SortDropdown';
import StickyContainerWrapper from './StickyContainerWrapper';

const StickyContainerDesktop = ({ className }: { className?: string }) => {
	return (
		<StickyContainerWrapper className={className}>
			{({ isStuck }) => (
				<>
					<CategoryName isStuck={isStuck} isProductSum />
					<div className={mergeClasses('flex', 'align-center', 'gap-1')}>
						<SideFiltersButton />
						<SortDropdown />
					</div>
				</>
			)}
		</StickyContainerWrapper>
	);
};

export default StickyContainerDesktop;
