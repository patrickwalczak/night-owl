import Link from 'next/link';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils/cn';

import { NavigationContext } from '../../Navigation';
import styles from './categoriesDropdown.module.scss';

export const DropdownCategory = ({
    category,
    isRootCategory = false,
}: {
    category: any;
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
