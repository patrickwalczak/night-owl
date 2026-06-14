'use client';

import Link from 'next/link';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils/cn';

import { CatalogContext } from '../../../model/providers/CatalogProvider';
import styles from './subcategories.module.scss';

const Subcategories = () => {
    const { subcategories } = useSafeContext(CatalogContext);

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
