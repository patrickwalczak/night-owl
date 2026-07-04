import Link from 'next/link';

import { CatalogContext } from '@/pages/categorySlug/model/providers/CatalogProvider';
import { useSafeContext } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import styles from './sideFiltersDesktop.module.scss';

export const Subcategories = () => {
    const { subcategories } = useSafeContext(CatalogContext);

    if (subcategories.length === 0) return null;

    return (
        <div className={cn(styles.subcategories, 'flex', 'flex-col')}>
            {subcategories.map(subcategory => (
                <Link
                    className={cn(styles.subcategory, 'truncate')}
                    key={subcategory.id}
                    href={`/category/${subcategory.slug}`}
                >
                    {subcategory.name}
                </Link>
            ))}
        </div>
    );
};
