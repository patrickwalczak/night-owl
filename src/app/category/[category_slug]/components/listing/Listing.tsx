import React from 'react';
import styles from './listing.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { getCategoryBySlug } from '@/lib/serverActions/category';
import { normalizeSearchParams, parseListingParams } from '@/utils/url';
import Subcategories from '../subcategories/Subcategories';
import { notFound } from 'next/navigation';
import { getProductsForCategory } from '@/lib/serverActions/product';
import { SearchParamsType, UrlParamType } from '@/types/catalog.models';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import FiltersDialog from '../mobile/FiltersDialog';
import ProductsInfinite from '../productsInfinite/ProductsInfinite';

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
		<div className={mergeClasses(styles.listing, 'flex', 'flex-col')}>
			<h2 className={mergeClasses(styles.categoryName)}>{category.name}</h2>
			<Subcategories categoryId={category.id} />
			<div className={mergeClasses(styles.stickyContainer, 'flex', 'align-center', 'justify-between')}>
				<CategoryProductsTotal categoryId={category.id} />
				<FiltersDialog />
			</div>

			<ProductsInfinite
				categorySlug={slug}
				search={`?${search.toString()}`}
				initialPage={{ items, page: 1, nextPage, total, pageSize }}
			/>
		</div>
	);
}
