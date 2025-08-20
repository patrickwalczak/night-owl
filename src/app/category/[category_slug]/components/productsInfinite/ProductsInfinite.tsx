'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import { ListingProductType } from '@/types/product.model';
import Product from '../product/Product';
import styles from './productsInfinite.module.scss';
import { useAppSelector } from '@/lib/store/hooks';

type PagePayload = {
	items: ListingProductType[];
	page: number;
	nextPage: number | null;
	total: number;
	pageSize: number;
};

type Props = {
	search: string;
	initialItems: ListingProductType[];
};

export default function ProductsInfinite({ search, initialItems }: Props) {
	const {
		category: { slug: categorySlug },
		page,
		pageSize,
		nextPage,
		productSum,
	} = useAppSelector((state) => state.catalog);

	const initialPage = {
		items: initialItems,
		page,
		nextPage,
		total: productSum,
		pageSize,
	};

	const key = useMemo(() => ['products', categorySlug, search], [categorySlug, search]);

	console.log(key);

	const fetchPage = async ({ pageParam = 1 }): Promise<PagePayload> => {
		const queryParams = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
		queryParams.set('page', String(pageParam));
		const res = await fetch(`/api/category/${categorySlug}/products?` + queryParams.toString(), { cache: 'no-store' });
		if (!res.ok) throw new Error('Failed to load');
		return res.json();
	};

	const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
		queryKey: key,
		queryFn: fetchPage,
		getNextPageParam: (last) => last.nextPage,
		initialPageParam: 1,
		initialData: initialPage ? { pages: [initialPage], pageParams: [1] } : undefined,
		staleTime: 30_000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let obs: IntersectionObserver | null = null;
		if (hasNextPage && loadMoreRef.current) {
			obs = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && fetchNextPage(), {
				rootMargin: '600px',
			});
			obs.observe(loadMoreRef.current);
		}

		return () => obs?.disconnect();
	}, [hasNextPage, fetchNextPage]);

	if (status === 'error') return <p>Couldn’t load products.</p>;

	const items = (data?.pages ?? []).flatMap((p) => p.items);

	if (items.length === 0) return <p>No products found.</p>;

	return (
		<div className={styles.container}>
			<div className={styles.productsContainer}>
				{items.map((p) => (
					<Product key={p.id} product={p} />
				))}
			</div>
			{hasNextPage && (
				<div className={styles.loaderContainer} ref={loadMoreRef} aria-hidden="true">
					<div className={styles.loader}></div>
				</div>
			)}
		</div>
	);
}
