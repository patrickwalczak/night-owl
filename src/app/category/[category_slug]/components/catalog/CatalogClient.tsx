'use client';

import { initState } from '@/lib/store/features/catalog/catalogSlice';
import { useAppStore } from '@/lib/store/hooks';
import { SimpleCategoryModelType } from '@/types/category.model';
import { FilterParameterType } from '@/types/parameter.model';
import { ListingProductType } from '@/types/product.model';
import React, { useRef } from 'react';

const CatalogClient = ({
	children,
	areFiltersOpen,
	productsData,
	parameters,
	category,
}: {
	children: React.ReactNode;
	areFiltersOpen: boolean;
	parameters: FilterParameterType[];
	category: SimpleCategoryModelType;
	productsData: {
		items: ListingProductType[];
		total: number;
		pageSize: number;
		page: number;
	};
}) => {
	const store = useAppStore();
	const initialized = useRef(false);

	const totalPages = Math.max(1, Math.ceil(productsData.total / productsData.pageSize));
	const nextPage = totalPages > 1 ? 2 : null;

	if (!initialized.current) {
		store.dispatch(
			initState({
				ui: { areFiltersOpen },
				parameters,
				subcategories: category.children,
				category: {
					id: category.id,
					name: category.name,
					slug: category.slug,
					parentId: category.parentId,
				},
				productSum: productsData.total,
				page: productsData.page,
				pageSize: productsData.pageSize,
				nextPage,
			})
		);
		initialized.current = true;
	}

	return <>{children}</>;
};

export default CatalogClient;
