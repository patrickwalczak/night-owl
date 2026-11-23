import { notFound } from 'next/navigation';

import { getCachedCategoryWithChildrenBySlug } from '@/entities/category/server';

import { getCachedCategoryParametersBySlug } from '../../../api/getCategoryPageData/getCategoryParametersBySlug';
import { SideFiltersDesktop } from './sideFilters/SideFiltersDesktop';
import { Subcategories } from './sideFilters/Subcategories';

export const FiltersServer = async ({ categorySlug }: { categorySlug: string }) => {
    const [category, parameters] = await Promise.all([
        getCachedCategoryWithChildrenBySlug(categorySlug),
        getCachedCategoryParametersBySlug(categorySlug),
    ]);
    if (!category || !parameters) notFound();

    return (
        <SideFiltersDesktop
            parameters={parameters}
            subcategories={<Subcategories subcategories={category.children} />}
        />
    );
};
