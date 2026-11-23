import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

import styles from './categoryName.module.scss';

export const CategoryName = ({ name, productCount }: {
    name: string;
    productCount: ReactNode;
}) => {
    return (
        <h2 className={cn(styles.categoryName, 'h4')}>
            {name}
            {productCount}
        </h2>
    );
};
