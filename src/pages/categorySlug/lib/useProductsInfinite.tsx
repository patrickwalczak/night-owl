'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';

import { useSafeContext } from '../../../shared/lib/hooks/useSafeContext';
import { DEFAULT_SORT_ORDER, SEARCH_PARAMS_KEYS } from '../config/searchParams';
import { type ListingProductType } from '../model/product.types';
import { CatalogContext } from '../model/providers/CatalogProvider';
import { CatalogUrlActionsContext } from '../model/providers/CatalogUrlActionsProvider';

interface PagePayload {
    items: ListingProductType[];
    total: number;
    page: number;
    pageSize: number;
    nextPage: number | null;
}

export function useProductsInfinite() {
    const {
        initialProducts,
        page,
        pageSize,
        nextPage,
        productSum,
        category: { slug: categorySlug },
    } = useSafeContext(CatalogContext);

    const { searchParams } = useSafeContext(CatalogUrlActionsContext);

    const initialPage: PagePayload = {
        items: initialProducts,
        page,
        nextPage,
        total: productSum,
        pageSize,
    };

    const { sort, params, query } = useMemo(() => {
        const sort = searchParams.get(SEARCH_PARAMS_KEYS.SORT) ?? DEFAULT_SORT_ORDER;
        const params = searchParams.get(SEARCH_PARAMS_KEYS.FILTERS) ?? '';
        const query = searchParams.get(SEARCH_PARAMS_KEYS.QUERY) ?? '';

        return { sort, params, query };
    }, [searchParams]);

    const queryKey = useMemo(
        () => ['categoryProducts', categorySlug, sort, params, query],
        [categorySlug, sort, params, query],
    );

    const firstKeyRef = useRef<string | null>(null);
    const keyStr = JSON.stringify(queryKey);

    if (firstKeyRef.current == null) firstKeyRef.current = keyStr;

    const shouldUseInitial = firstKeyRef.current === keyStr;

    const fetchPage = async ({
        pageParam = 1,
        signal,
    }: {
        pageParam?: number;
        signal?: AbortSignal;
    }): Promise<PagePayload> => {
        const searchParamsCloned = new URLSearchParams(searchParams.toString());
        searchParamsCloned.set(SEARCH_PARAMS_KEYS.PAGE, String(pageParam));

        const res = await fetch(`/api/category/${categorySlug}/products?` + searchParamsCloned.toString(), {
            cache: 'no-store',
            signal,
        });
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
    };

    return useInfiniteQuery({
        queryKey,
        queryFn: fetchPage,
        initialPageParam: 1,
        getNextPageParam: last => last.nextPage ?? undefined,
        initialData: shouldUseInitial ? { pages: [initialPage], pageParams: [1] } : undefined,
        placeholderData: prev => prev,
        staleTime: 30_000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
}
