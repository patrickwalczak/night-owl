import React from 'react';
import styles from './catalogView.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { getCategoryBySlug } from '@/lib/serverActions/category';
import { normalizeSearchParams, parseListingParams } from '@/utils/url';
import Subcategories from '../subcategories/Subcategories';
import { notFound } from 'next/navigation';
import { getProductsForCategory } from '@/lib/serverActions/product';
import { SearchParamsType, UrlParamType } from '@/types/catalog.models';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import ProductsInfinite from '../productsInfinite/ProductsInfinite';
import FiltersDialogMobile from '../filtersDialogMobile/FiltersDialogMobile';

export default async function CatalogView({
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
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			<h2 className={mergeClasses(styles.categoryName)}>{category.name}</h2>
			<Subcategories categoryId={category.id} />
			<div className={mergeClasses(styles.stickyContainer, 'flex', 'align-center', 'justify-between')}>
				<CategoryProductsTotal categoryId={category.id} />
				<FiltersDialogMobile />
			</div>

			<ProductsInfinite
				categorySlug={slug}
				search={`?${search.toString()}`}
				initialPage={{ items, page: 1, nextPage, total, pageSize }}
			/>
		</main>
	);
}
