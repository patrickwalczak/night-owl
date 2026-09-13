'use client';

import { useCallback } from 'react';

import { type ProductListPage } from '@/entities/product';
import { Product } from '@/entities/product/client';
import { type UnregisterTarget, type RegisterTarget } from '@/pages/category/lib/hooks/usePageParamSetter';
import { cn } from '@/shared/lib/utils';

import styles from './productsInfinite.module.scss';

interface SinglePageContainerType {
    pageData: ProductListPage;
    registerPage: RegisterTarget;
    unregisterPage: UnregisterTarget;
}

export const SinglePageContainer = ({ pageData, registerPage, unregisterPage }: SinglePageContainerType) => {
    const callbackRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;

        registerPage(pageData.page, node);

        return () => {
            unregisterPage(pageData.page);
        };
    }, [pageData.page, registerPage, unregisterPage]);

    return (
        <div ref={callbackRef}>
            <div className={cn('m-075', 'flex-center')}>
                <span className={cn(styles.separator, 'text-xs')}>{`Page ${pageData.page}`}</span>
            </div>
            <div className={styles.productsContainer}>
                {pageData.items.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
