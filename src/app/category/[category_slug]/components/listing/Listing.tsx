import React from 'react';
import styles from './listing.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import ParametersController from '../mobile/parametersController/ParametersController';
import ProductsInfinite from '../ProductsInfinite';
import { getCategoryBySlug, getCategoryProductCountDirect, getProductsForCategory } from '@/lib/catalog/data';
import { normalizeSearchParams, parseListingParams } from '@/lib/catalog/url';
import Subcategories from '../subcategories/Subcategories';
import { SearchParamsType, UrlParamType } from '@/lib/catalog/types';
import { notFound } from 'next/navigation';

export default async function Listing({
	params,
	searchParams,
}: {
	params: UrlParamType;
	searchParams: SearchParamsType;
}) {
	const slug = params.category_slug;
	const search = normalizeSearchParams(searchParams);
	const parsed = parseListingParams(search);

	const category = await getCategoryBySlug(slug);

	if (!category) notFound();

	const totalInCategory = await getCategoryProductCountDirect(category.id);

	const { items, total, pageSize } = await getProductsForCategory({
		categoryId: category.id,
		page: parsed.page ?? 1,
		sort: parsed.sort,
		query: parsed.query,
		paramValueIds: parsed.paramValueIds,
	});

	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const nextPage = totalPages > 1 ? 2 : null;

	return (
		<div className={styles.listingContainer}>
			<h2 className={mergeClasses(styles.productsHeading, 'transition-200')}>{category.name}</h2>
			<Subcategories categoryId={category.id} />
			<div className={mergeClasses(styles.productControlsButtons, 'flex', 'align-center', 'justify-between')}>
				<span>{totalInCategory} Results</span>
				<ParametersController />
			</div>

			<ProductsInfinite
				categorySlug={slug}
				search={`?${search.toString()}`}
				initialPage={{ items, page: 1, nextPage, total, pageSize }}
			/>
		</div>
	);
}
