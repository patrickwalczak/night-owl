'use client';

import { useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSafeContext } from './useSafeContext';
import { CatalogContext } from '@/app/category/[category_slug]/providers/CatalogProvider';
import { ListingProductType } from '@/types/product.model';
import { DEFAULT_SORT_ORDER } from '@/constants';
import { CatalogUrlActionsContext } from '@/app/category/[category_slug]/providers/CatalogUrlActionsProvider';

type PagePayload = {
	items: ListingProductType[];
	total: number;
	page: number;
	pageSize: number;
	nextPage: number | null;
};

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
		const sort = searchParams.get('sort') ?? DEFAULT_SORT_ORDER;
		const params = searchParams.get('params') ?? '';
		const query = searchParams.get('query') ?? '';
		return { sort, params, query };
	}, [searchParams]);

	const queryKey = useMemo(
		() => ['categoryProducts', categorySlug, sort, params, query] as const,
		[categorySlug, sort, params, query]
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
		searchParamsCloned.set('page', String(pageParam));

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
		getNextPageParam: (last) => last.nextPage ?? undefined,
		initialData: shouldUseInitial ? { pages: [initialPage], pageParams: [1] } : undefined,
		placeholderData: (prev) => prev,
		staleTime: 30_000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
}
