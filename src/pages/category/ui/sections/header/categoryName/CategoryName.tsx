'use client';

import { cn } from '@/shared/lib/utils';

import { useCategoryPageSelector } from '../../../../model/store/client';
import styles from './categoryName.module.scss';

const CategoryName = ({ isStuck = false }: {
    isProductSum?: boolean;
    isStuck?: boolean;
}) => {
    const name = useCategoryPageSelector(state => state.categoryListing.category.name);
    const productSum = useCategoryPageSelector(state => state.categoryListing.productSum);

    return (
        <h2 className={cn(styles.categoryName, { [styles.stuck]: isStuck }, 'h4')}>
            {name}
            {` (${productSum})`}
        </h2>
    );
};

export default CategoryName;
