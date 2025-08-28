'use client';

import React, { useState } from 'react';
import { SimpleCategoryModelType } from '@/types/category.model';
import { FilterParameterType } from '@/types/parameter.model';
import { ListingProductType } from '@/types/product.model';

type CategoryMini = {
	id: string;
	name: string;
	slug: string;
	parentId: string | null;
};

export type SubcategoryType = Pick<SimpleCategoryModelType, 'id' | 'name' | 'slug'>[];

interface CatalogContextType {
	areFiltersOpen: boolean;
	parameters: FilterParameterType[];
	subcategories: SubcategoryType;
	category: CategoryMini;
	productSum: number;
	page: number;
	pageSize: number;

	totalPages: number;
	nextPage: number | null;

	setAreFiltersOpen: (v: boolean) => void;
	toggleFilters: () => void;
	setParameters: (v: FilterParameterType[]) => void;
	setSubcategories: (v: SubcategoryType) => void;
	setCategory: (v: CategoryMini) => void;
	setProductSum: (v: number) => void;
	setPage: (v: number) => void;
	setPageSize: (v: number) => void;
}

export const CatalogContext = React.createContext<CatalogContextType | null>(null);

const CatalogProvider = ({
	children,
	areFiltersOpen: areFiltersOpenProp,
	productsData,
	parameters: parametersProp,
	category: categoryProp,
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
	const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(areFiltersOpenProp);
	const [parameters, setParameters] = useState<FilterParameterType[]>(parametersProp);
	const [subcategories, setSubcategories] = useState<SubcategoryType>(categoryProp.children);
	const [category, setCategory] = useState<CategoryMini>({
		id: categoryProp.id,
		name: categoryProp.name,
		slug: categoryProp.slug,
		parentId: categoryProp.parentId ?? null,
	});

	const [productSum, setProductSum] = useState<number>(productsData.total);
	const [page, setPage] = useState<number>(productsData.page);
	const [pageSize, setPageSize] = useState<number>(productsData.pageSize);

	const totalPages = Math.max(1, Math.ceil(productSum / pageSize));
	const nextPage = page < totalPages ? page + 1 : null;

	const value = {
		areFiltersOpen,
		parameters,
		subcategories,
		category,
		productSum,
		page,
		pageSize,
		totalPages,
		nextPage,
		setAreFiltersOpen,
		toggleFilters: () => setAreFiltersOpen((v) => !v),
		setParameters,
		setSubcategories,
		setCategory,
		setProductSum,
		setPage,
		setPageSize,
	};

	return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export default CatalogProvider;
