'use client';

import { useEffect, useRef } from 'react';

import { useProductsInfinite } from '@/shared/hooks/useProductsInfinite';
import PulsingMask from '@/shared/ui/pulsingMask/PulsingMask';

import Product from '../product/Product';
import styles from './productsInfinite.module.scss';

export default function ProductsInfinite() {
    const { hasNextPage, fetchNextPage, data, status, isFetching } = useProductsInfinite();
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        if (hasNextPage && loadMoreRef.current) {
            observer = new IntersectionObserver(entries => entries.some(e => e.isIntersecting) && fetchNextPage(), {
                rootMargin: '600px',
            });
            observer.observe(loadMoreRef.current);
        }

        return () => observer?.disconnect();
    }, [hasNextPage, fetchNextPage]);

    if (status === 'error') return <p>{'Couldn’t load products.'}</p>;

    const items = (data?.pages ?? []).flatMap(p => p.items);

    if (items.length === 0) return <p>{'No products found.'}</p>;

    return (
        <PulsingMask active={false} wrapClassName={styles.container}>
            <div className={styles.productsContainer}>
                {items.map(p => (
                    <Product key={p.id} product={p} />
                ))}
            </div>
            {hasNextPage && (
                <div className={styles.loaderContainer} ref={loadMoreRef} aria-hidden={'true'}>
                    <div className={styles.loader}></div>
                </div>
            )}
        </PulsingMask>
    );
}
