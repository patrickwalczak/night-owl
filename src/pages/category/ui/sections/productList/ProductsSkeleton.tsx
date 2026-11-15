import { cn } from '@/shared/lib/utils';

import productStyles from './productsInfinite/productsInfinite.module.scss';
import styles from './productsSkeleton.module.scss';

export const ProductsSkeleton = () => (
    <div className={productStyles.container}>
        <span role={'status'} className={'sr-only'}>{'Loading products...'}</span>
        <div aria-hidden className={productStyles.productsContainer}>
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
);
