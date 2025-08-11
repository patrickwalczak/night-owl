import React from 'react';
import styles from './listing.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import ParametersController from '../mobile/parametersController/ParametersController';
import ProductsInfinite from '../ProductsInfinite';
import { getCategoryBySlug, getProductsForCategory } from '@/lib/catalog/data';
import { parseListingParams } from '@/lib/catalog/url';

export default async function Listing({
	params,
	searchParams,
}: {
	params: { category_slug: string };
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const slug = params.category_slug;

	const search =
		'?' +
		new URLSearchParams(
			Object.entries(searchParams).flatMap(([key, value]) =>
				value == null ? [] : Array.isArray(value) ? value.map((x) => [key, x]) : [[key, value]]
			)
		).toString();

	const parsed = parseListingParams(new URLSearchParams(search.slice(1)));

	const category = await getCategoryBySlug(slug);
	if (!category) {
		return null;
	}

	const { items, total, pageSize } = await getProductsForCategory({
		categoryId: category.id,
		page: parsed.page ?? 1,
		sort: parsed.sort,
		q: parsed.q,
		priceMin: parsed.priceMin,
		priceMax: parsed.priceMax,
		paramValueIds: parsed.paramValueIds,
	});

	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const nextPage = totalPages > 1 ? 2 : null;

	return (
		<div className={styles.listingContainer}>
			<h2 className={mergeClasses(styles.productsHeading, 'transition-200')}>{category.name}</h2>

			<div className={styles.productControlsButtons}>
				<ParametersController />
			</div>

			<ProductsInfinite
				categorySlug={slug}
				search={search}
				initialPage={{ items, page: 1, nextPage, total, pageSize }}
			/>
		</div>
	);
}
