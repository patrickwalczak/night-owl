import { cn } from '@/shared/lib/utils';

import { ProductsSkeleton } from '../../sections/productList/ProductsSkeleton';
import pageStyles from '../categoryProducts/categoryProducts.module.scss';
import styles from './categoryPageSkeleton.module.scss';

export const CategoryPageSkeleton = () => {
    return (
        <main className={pageStyles.container}>
            <span role={'status'} className={'sr-only'}>{'Loading products...'}</span>

            <div aria-hidden className={styles.content}>
                <div className={styles.header}>
                    <div className={cn(styles.placeholder, styles.heading)} />
                    <div className={styles.subcategories}>
                        {Array.from({ length: 3 }, (_, index) => (
                            <div key={index} className={cn(styles.placeholder, styles.subcategory)} />
                        ))}
                    </div>
                    <div className={cn(styles.placeholder, styles.count)} />
                    <div className={cn(styles.placeholder, styles.filters)} />
                </div>

                <div className={styles.products}>
                    <ProductsSkeleton />
                </div>
            </div>
        </main>
    );
};
