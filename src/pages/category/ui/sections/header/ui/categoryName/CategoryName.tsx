'use client';

import { useCategoryPageSelector } from '@/pages/category/model/store/client';
import { cn } from '@/shared/lib/utils';

import styles from './categoryName.module.scss';

const CategoryName = ({ isStuck = false }: {
    isProductSum?: boolean;
    isStuck?: boolean;
}) => {
    const name = useCategoryPageSelector(state => state.categoryListing.category.name);
    const productSum = useCategoryPageSelector(state => state.categoryListing.productSum);

    return (
        <h2 className={cn(styles.categoryName, { [styles.stuck]: isStuck }, 'transition-200', 'h4')}>
            {name}
            {` (${productSum})`}
        </h2>
    );
};

export default CategoryName;
