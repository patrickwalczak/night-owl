import { useSafeContext } from '@/shared/hooks/useSafeContext';
import SubcategoriesDropdown from '@/widgets/navigation/ui/desktop/categoriesDropdown/CategoriesDropdown';
import { NavigationContext } from '@/widgets/navigation/ui/Navigation';

import NavigationButton from './NavigationButton';

export const CategoriesDropdown = () => {
    const { categories, setIsExpanded, isExpanded } = useSafeContext(NavigationContext);

    const handleClick = () => setIsExpanded(prev => !prev);

    return (
        <>
            <NavigationButton className={isExpanded ? '' : 'mobile-nav-element--border-bottom'} handleClick={handleClick}>
                {'Catalog'}
            </NavigationButton>
            <SubcategoriesDropdown categories={categories} isExpanded={isExpanded} />
        </>
    );
};
