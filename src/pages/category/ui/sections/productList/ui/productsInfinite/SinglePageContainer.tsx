'use client';

import { type ProductListPage } from '@/entities/product';
import { setPageParamInUrl } from '@/pages/category/lib/url';
import { useIntersectionObserver } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import Product from '../product/Product';
import styles from './productsInfinite.module.scss';

interface SinglePageContainerType {
    pageData: ProductListPage;
}

const INTERSECTION_OPTIONS: IntersectionObserverInit = { rootMargin: '0px 0px 0px 0px' };

export const SinglePageContainer = ({ pageData }: SinglePageContainerType) => {
    const onPageIntersect = (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) setPageParamInUrl(pageData.page);
    };

    const pageRef = useIntersectionObserver<HTMLDivElement>({
        callback: onPageIntersect,
        options: INTERSECTION_OPTIONS,
        enabled: true,
    });

    return (
        <div ref={pageRef}>
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
