import Link from 'next/link';

import type { RootCategoriesWithChildren } from '@/entities/category';

import { useSafeContext } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import { NavigationContext } from '../../Navigation';
import styles from './categoriesDropdown.module.scss';

type RootCategory = RootCategoriesWithChildren[number];
type ChildCategory = RootCategory['children'][number] & {
    children: [];
};
type DropdownCategoryType = RootCategory | ChildCategory;

export const DropdownCategory = ({
    category,
    isRootCategory = false,
}: {
    category: DropdownCategoryType;
    isRootCategory?: boolean;
}) => {
    const { setIsExpanded } = useSafeContext(NavigationContext);

    const handleClick = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <li>
                <Link
                    onClick={handleClick}
                    className={cn(styles.dropdownLink, { [styles.isRootCategory]: isRootCategory })}
                    href={`/category/${category.slug}`}
                >
                    {category.name}
                </Link>
            </li>

            {category.children.length
                ? category.children.map(child => <DropdownCategory key={child.id} category={{ children: [], ...child }} />)
                : null}
        </>
    );
};
