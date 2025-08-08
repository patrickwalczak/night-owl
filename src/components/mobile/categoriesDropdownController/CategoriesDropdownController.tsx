import React from 'react';
import NavigationButton from '../navigationButton/NavigationButton';
import SubcategoriesDropdown from '@/components/categoriesDropdown/CategoriesDropdown';
import { useSafeContext } from '@/hooks/useSafeContext';
import { NavigationContext } from '@/components/navigation/Navigation';

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
