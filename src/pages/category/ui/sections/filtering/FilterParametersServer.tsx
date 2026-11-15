import { notFound } from 'next/navigation';

import { getCachedCategoryParametersBySlug } from '../../../api/getCategoryPageData/getCategoryParametersBySlug';
import { ParameterBox } from './parameterBox/ParameterBox';

export const FilterParametersServer = async ({ categorySlug }: { categorySlug: string }) => {
    const parameters = await getCachedCategoryParametersBySlug(categorySlug);
    if (!parameters) notFound();

    return parameters.map(parameter => <ParameterBox key={parameter.id} parameter={parameter} />);
};
