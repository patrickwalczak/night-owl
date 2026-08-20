'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

import { useCatalogSelector } from '../../../model/client';
import styles from './subcategories.module.scss';

const Subcategories = () => {
    const subcategories = useCatalogSelector(state => state.catalog.subcategories);

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

export default Subcategories;
