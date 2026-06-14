'use client';

import { useState, createContext, type ReactNode } from 'react';

import { type ListingProductType } from '@/pages/categorySlug/model/product.types';

interface CategoryMini {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
}

interface CatalogContextType {
    initialProducts: ListingProductType[];
    areFiltersOpen: boolean;
    parameters: any[];
    subcategories: any;
    category: CategoryMini;
    productSum: number;
    page: number;
    pageSize: number;
    totalPages: number;
    nextPage: number | null;
    setAreFiltersOpen: (v: boolean) => void;
    toggleFilters: () => void;
    setParameters: (v: any[]) => void;
    setSubcategories: (v: any) => void;
    setCategory: (v: CategoryMini) => void;
    setProductSum: (v: number) => void;
    setPage: (v: number) => void;
    setPageSize: (v: number) => void;
}

export const CatalogContext = createContext<CatalogContextType | null>(null);

const CatalogProvider = ({
    children,
    areFiltersOpen: areFiltersOpenProp,
    initialProductsProp,
    parameters: parametersProp,
    category: categoryProp,
}: {
    children: ReactNode;
    areFiltersOpen: boolean;
    parameters: any[];
    category: any;
    initialProductsProp: {
        items: ListingProductType[];
        total: number;
        pageSize: number;
        page: number;
    };
}) => {
    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(areFiltersOpenProp);
    const [parameters, setParameters] = useState<any[]>(parametersProp);
    const [subcategories, setSubcategories] = useState<any>(categoryProp.children);
    const [category, setCategory] = useState<CategoryMini>({
        id: categoryProp.id,
        name: categoryProp.name,
        slug: categoryProp.slug,
        parentId: categoryProp.parentId ?? null,
    });

    const [productSum, setProductSum] = useState<number>(initialProductsProp.total);
    const [page, setPage] = useState<number>(initialProductsProp.page);
    const [pageSize, setPageSize] = useState<number>(initialProductsProp.pageSize);
    const [initialProducts] = useState(initialProductsProp.items);

    const totalPages = Math.max(1, Math.ceil(productSum / pageSize));
    const nextPage = page < totalPages ? page + 1 : null;

    const value = {
        initialProducts,
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
        toggleFilters: () => setAreFiltersOpen(v => !v),
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
