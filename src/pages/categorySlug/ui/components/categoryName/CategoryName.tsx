'use client';

import { CatalogContext } from '@/pages/categorySlug/model/providers/CatalogProvider';
import { useSafeContext } from '@/shared/hooks/useSafeContext';
import { mergeClasses } from '@/utils/mergeClasses';

import styles from './categoryName.module.scss';

const CategoryName = ({ isProductSum = false, isStuck = false }: { isProductSum?: boolean; isStuck?: boolean }) => {
    const {
        productSum,
        category: { name },
    } = useSafeContext(CatalogContext);

    return (
        <h2 className={mergeClasses(styles.categoryName, isStuck && styles.stuck, 'transition-200', 'h4')}>
            {name}
            {isProductSum && ` (${productSum})`}
        </h2>
    );
};

export default CategoryName;
