'use client';

import styles from './productsInfinite.module.scss';

export default function ProductsInfinite() {
    return (
        <div className={styles.container}>
            <div className={styles.productsContainer}>
                {/* {items.map(p => (
                    <Product key={p.id} product={p} />
                ))} */}
            </div>
            {/* <div className={styles.loaderContainer} aria-hidden={'true'}>
                <div className={styles.loader}></div>
            </div> */}
        </div>
    );
}
