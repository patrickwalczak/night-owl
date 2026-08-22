'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

import { useCategoryPageSelector } from '../../../model/client';
import styles from './subcategories.module.scss';

const Subcategories = () => {
    const subcategories = useCategoryPageSelector(state => state.categoryListing.subcategories);

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
