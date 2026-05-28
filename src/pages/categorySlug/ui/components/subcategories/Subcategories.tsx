'use client';

import Link from 'next/link';

import { useSafeContext } from '@/shared/hooks/useSafeContext';
import { mergeClasses } from '@/utils/mergeClasses';

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
                        className={mergeClasses(styles.subcategory, 'text-xs')}
                    >
                        {subcategory.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Subcategories;
