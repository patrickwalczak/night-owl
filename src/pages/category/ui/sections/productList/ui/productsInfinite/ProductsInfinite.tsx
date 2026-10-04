'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { ProductListPage } from '@/entities/product';
import type { ParsedFilters } from '@/pages/category/model/params/searchParams.types';

import { usePageParamSetter } from '@/pages/category/lib/hooks/usePageParamSetter';
import { normalizeSearchParams } from '@/pages/category/lib/url';
import { useCategoryPageSelector } from '@/pages/category/model/store/client';
import { useIntersectionObserver } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils';

import { NoProductsFound } from '../noProductsFound/NoProductsFound';
import styles from './productsInfinite.module.scss';
import { SinglePageContainer } from './SinglePageContainer';

type ProductsLoadMode = 'auto' | 'manual';

interface ProductsInfiniteType {
    initialProducts: ProductListPage;
    appliedFilters: ParsedFilters;
}

const INTERSECTION_OPTIONS = { rootMargin: '0px 0px 200px 0px' };
const DEFAULT_PRODUCTS_LOAD_MODE: ProductsLoadMode = 'auto';

const fetchCategoryProducts = async (
    categorySlug: string,
    pageParam: number,
    appliedFilters: ParsedFilters,
): Promise<ProductListPage> => {
    const searchParams = normalizeSearchParams({ ...appliedFilters, page: String(pageParam) });
    const response = await fetch(`/api/category/${categorySlug}/products?${searchParams}`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
};

export const ProductsInfinite = ({ initialProducts, appliedFilters }: ProductsInfiniteType) => {
    const [loadMode] = useState<ProductsLoadMode>(DEFAULT_PRODUCTS_LOAD_MODE);
    const isAutoLoadEnabled = loadMode === 'auto';

    const slug = useCategoryPageSelector(state => state.categoryListing.category.slug);

    const { data, hasNextPage, isPending, isFetchingNextPage, isFetchNextPageError, fetchNextPage } = useInfiniteQuery({
        initialPageParam: initialProducts.page,
        queryKey: ['products-infinite', slug, appliedFilters, initialProducts.page],
        queryFn: ({ pageParam }) => fetchCategoryProducts(slug, pageParam, appliedFilters),
        getNextPageParam: lastPage => lastPage.nextPage,
        initialData: { pages: [initialProducts], pageParams: [initialProducts.page] },
        staleTime: 240000,
    });

    const onSentinelIntersect = (entry: IntersectionObserverEntry) => {
        if (!entry.isIntersecting || hasNextPage === false || isFetchingNextPage || isFetchNextPageError) return;
        fetchNextPage();
    };

    const sentinelRef = useIntersectionObserver<HTMLDivElement>({
        callback: onSentinelIntersect,
        options: INTERSECTION_OPTIONS,
        enabled: isAutoLoadEnabled && hasNextPage && !isFetchingNextPage && !isFetchNextPageError,
    });

    const { registerTarget, unregisterTarget } = usePageParamSetter();

    if (isPending) {
        return (
            <div aria-busy className={cn(styles.container, 'flex-center')}>
                <div className={styles.loader} />
            </div>
        );
    }

    if (!data) {
        return <p role={'alert'}>{'Failed to fetch products'}</p>;
    }

    if (data.pages[0]?.total === 0) {
        return (
            <div className={styles.container}>
                <NoProductsFound />
            </div>
        );
    }

    return (
        <div aria-busy={isFetchingNextPage} className={styles.container}>
            {data.pages.map((pageData) => {
                return (
                    <SinglePageContainer
                        key={pageData.page}
                        pageData={pageData}
                        registerPage={registerTarget}
                        unregisterPage={unregisterTarget}
                    />
                );
            })}
            {hasNextPage && (
                <div className={cn('flex-center', 'm-2')}>
                    {isFetchNextPageError && !isFetchingNextPage && (
                        <div role={'alert'}>
                            <p>{'Failed to load more products.'}</p>
                            <button onClick={() => fetchNextPage()} className={styles.loadMoreBtn}>
                                {'Try again'}
                            </button>
                        </div>
                    )}
                    {isAutoLoadEnabled && !isFetchingNextPage && !isFetchNextPageError && (
                        <div ref={sentinelRef} aria-hidden className={styles.sentinel} />
                    )}
                    {!isAutoLoadEnabled && !isFetchingNextPage && !isFetchNextPageError && (
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className={cn(styles.loadMoreBtn)}
                        >
                            {'Load more...'}
                        </button>
                    )}
                    {hasNextPage && isFetchingNextPage && (
                        <div className={styles.loader}></div>
                    )}
                </div>
            )}
        </div>
    );
};
