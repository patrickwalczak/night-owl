import Link from 'next/link';

import { type CategoryWithProductCount } from '@/entities/category';
import { cn } from '@/shared/lib/utils';

import styles from './subcategoriesCompact.module.scss';

export const SubcategoriesCompact = ({ subcategories }: { subcategories: CategoryWithProductCount[] }) => {
    if (!subcategories.length) return null;

    return (
        <div className={styles.ribbon}>
            <div className={styles.scroller}>
                {subcategories.map(subcategory => (
                    <Link
                        key={subcategory.id}
                        href={`/category/${subcategory.slug}`}
                        className={cn(styles.subcategory, 'text-xs')}
                    >
                        {subcategory.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
