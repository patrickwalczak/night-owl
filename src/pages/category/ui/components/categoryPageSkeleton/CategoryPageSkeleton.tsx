import { cn } from '@/shared/lib/utils';

import productStyles from '../../sections/productList/ui/productsInfinite/productsInfinite.module.scss';
import pageStyles from '../categoryProducts/categoryProducts.module.scss';
import styles from './categoryPageSkeleton.module.scss';

export default function CategoryPageSkeleton() {
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
                    <div className={productStyles.productsContainer}>
                        {Array.from({ length: 8 }, (_, index) => (
                            <div key={index} className={styles.card}>
                                <div className={cn(styles.placeholder, styles.image)} />
                                <div className={styles.details}>
                                    <div className={cn(styles.placeholder, styles.title)} />
                                    <div className={cn(styles.placeholder, styles.cart)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
