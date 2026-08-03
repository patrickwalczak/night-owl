'use client';

import { useCatalogSelector } from '@/pages/categorySlug/model/client';
import { cn } from '@/shared/lib/utils';

import styles from './categoryName.module.scss';

const CategoryName = ({ isProductSum = false, isStuck = false }: {
    isProductSum?: boolean;
    isStuck?: boolean;
}) => {
    const name = useCatalogSelector(state => state.catalog.category.name);
    const productSum = useCatalogSelector(state => state.catalog.productSum);

    return (
        <h2 className={cn(styles.categoryName, isStuck && styles.stuck, 'transition-200', 'h4')}>
            {name}
            {isProductSum && ` (${productSum})`}
        </h2>
    );
};

export default CategoryName;
