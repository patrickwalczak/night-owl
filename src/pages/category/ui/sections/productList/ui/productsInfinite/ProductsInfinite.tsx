'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';

import type { ProductListPage } from '@/entities/product';

import { useCategoryPageSelector } from '@/pages/category/model/client';
import { cn } from '@/shared/lib/utils';

import Product from '../product/Product';
import styles from './productsInfinite.module.scss';

const fetchCategoryProducts = async (categorySlug: string, pageParam: number): Promise<ProductListPage> => {
    const response = await fetch(`/api/category/${categorySlug}/products?page=${pageParam}`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
};

export default function ProductsInfinite() {
    const { initialProducts,
        category: { slug },
        totalPages,
        page,
        productSum,
        pageSize,
    } = useCategoryPageSelector(state => state.categoryListing);
    const nextPage = page >= totalPages ? null : page + 1;

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
        initialPageParam: page,
        queryKey: ['products-infinite', slug],
        queryFn: ({ pageParam }) => fetchCategoryProducts(slug, pageParam),
        getNextPageParam: lastPage => lastPage.nextPage,
        initialData: {
            pages: [{
                items: initialProducts,
                nextPage,
                pageSize,
                totalPages,
                total: productSum,
                page,
            }],
            pageParams: [page],
        },
        staleTime: 240000,
    });

    return (
        <div className={styles.container}>
            {data.pages.map((pageData) => {
                return (
                    <Fragment key={pageData.page}>
                        <div className={cn('m-075', 'flex-center')}>
                            <span className={cn(styles.separator, 'text-xs')}>{`Page ${pageData.page}`}</span>
                        </div>
                        <div className={styles.productsContainer}>
                            {pageData.items.map(product => (
                                <Product key={product.id} product={product} />
                            ))}
                        </div>
                    </Fragment>
                );
            })}
            <div className={cn('flex-center', 'm-2')}>
                {isFetchingNextPage === false && hasNextPage === true && (
                    <button
                    // ref={ref}
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className={cn(styles.loadMoreBtn)}
                    >
                        {'Load more...'}
                    </button>
                )}
                {hasNextPage && isFetchingNextPage && (
                    <div className={styles.loader}></div>
                )}
            </div>
        </div>
    );
}
