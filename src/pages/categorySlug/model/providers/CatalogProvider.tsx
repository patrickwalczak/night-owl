'use client';

import { useState, createContext, type Dispatch, type ReactNode, type SetStateAction } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/client';

import {
    type CatalogCategory,
    type CatalogCategorySummary,
    type CatalogParameter,
    type CatalogProduct,
    type CatalogProductsPage,
    type CatalogSubcategory,
} from '../../model/catalog.types';

interface CatalogContextType {
    initialProducts: CatalogProduct[];
    areFiltersOpen: boolean;
    parameters: CatalogParameter[];
    subcategories: CatalogSubcategory[];
    category: CatalogCategorySummary;
    productSum: number;
    page: number;
    pageSize: number;
    totalPages: number;
    nextPage: number | null;
    setAreFiltersOpen: Dispatch<SetStateAction<boolean>>;
    toggleFilters: () => void;
    setParameters: Dispatch<SetStateAction<CatalogParameter[]>>;
    setSubcategories: Dispatch<SetStateAction<CatalogSubcategory[]>>;
    setCategory: Dispatch<SetStateAction<CatalogCategorySummary>>;
    setProductSum: Dispatch<SetStateAction<number>>;
    setPage: Dispatch<SetStateAction<number>>;
    setPageSize: Dispatch<SetStateAction<number>>;
}

interface CatalogProviderProps {
    children: ReactNode;
    areFiltersOpen: boolean;
    parameters: CatalogParameter[];
    category: CatalogCategory;
    initialProductsProp: CatalogProductsPage;
}

const CatalogContext = createContext<CatalogContextType | null>(null);

export const useCatalog = () => useSafeContext(CatalogContext);

const CatalogProvider = ({
    children,
    areFiltersOpen: areFiltersOpenProp,
    initialProductsProp,
    parameters: parametersProp,
    category: categoryProp,
}: CatalogProviderProps) => {
    const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(areFiltersOpenProp);
    const [parameters, setParameters] = useState<CatalogParameter[]>(parametersProp);
    const [subcategories, setSubcategories] = useState<CatalogSubcategory[]>(categoryProp.children);
    const [category, setCategory] = useState<CatalogCategorySummary>({
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

    const value: CatalogContextType = {
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
