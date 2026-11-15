'use client';

import { cn } from '@/shared/lib/utils';

import { useCategoryPageContext } from '../../../../model/categoryPageContext';
import styles from './categoryName.module.scss';

export const CategoryName = ({ isStuck = false }: {
    isProductSum?: boolean;
    isStuck?: boolean;
}) => {
    const { category: { name }, productSum } = useCategoryPageContext();

    return (
        <h2 className={cn(styles.categoryName, { [styles.stuck]: isStuck }, 'h4')}>
            {name}
            {` (${productSum})`}
        </h2>
    );
};
