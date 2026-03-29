import React from 'react';
import NavigationButton from './NavigationButton';
import SubcategoriesDropdown from '@/widgets/navigation/ui/desktop/categoriesDropdown/CategoriesDropdown';
import { NavigationContext } from '@/widgets/navigation/ui/Navigation';
import { useSafeContext } from '@/shared/hooks/useSafeContext';

export const CategoriesDropdownController = () => {
	const { categories, setIsExpanded, isExpanded } = useSafeContext(NavigationContext);

	const handleClick = () => setIsExpanded((prev) => !prev);

	return (
		<>
			<NavigationButton className={isExpanded ? '' : 'mobile-nav-element--border-bottom'} handleClick={handleClick}>
				Catalog
			</NavigationButton>
			<SubcategoriesDropdown categories={categories} isExpanded={isExpanded} />
		</>
	);
};
