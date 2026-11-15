import { notFound } from 'next/navigation';

import { getCachedCategoryParametersBySlug } from '../../../api/getCategoryPageData/getCategoryParametersBySlug';
import { SideFiltersDesktop } from './sideFilters/SideFiltersDesktop';

export const FiltersServer = async ({ categorySlug }: { categorySlug: string }) => {
    const parameters = await getCachedCategoryParametersBySlug(categorySlug);
    if (!parameters) notFound();

    return (
        <SideFiltersDesktop parameters={parameters} />
    );
};
