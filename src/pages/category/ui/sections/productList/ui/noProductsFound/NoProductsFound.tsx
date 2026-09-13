import { cn } from '@/shared/lib/utils';

import styles from './noProductsFound.module.scss';

export const NoProductsFound = () => {
    return (
        <section className={styles.container} aria-labelledby={'no-products-found-title'}>
            <div className={styles.content}>
                <h3 id={'no-products-found-title'} className={cn('h4', styles.title)}>
                    {'No products found'}
                </h3>
                <p className={cn('text-sm', styles.description)}>
                    {'Try changing your search or filters.'}
                </p>
            </div>
        </section>
    );
};
