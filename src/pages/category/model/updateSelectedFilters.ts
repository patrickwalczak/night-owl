import type { SelectedFilter } from './categoryPage.types';
import type { ParsedFilters } from './params/searchParams.types';

export const updateSelectedFilters = (
    filters: ParsedFilters,
    { parameterSlug, parameterValueSlug, checked }: SelectedFilter,
): ParsedFilters => {
    const values = Object.hasOwn(filters, parameterSlug) ? filters[parameterSlug] : [];

    if (checked) {
        if (values.includes(parameterValueSlug)) return filters;

        return { ...filters, [parameterSlug]: [...values, parameterValueSlug] };
    }

    if (!values.includes(parameterValueSlug)) return filters;

    const remainingValues = values.filter(value => value !== parameterValueSlug);
    const nextFilters = { ...filters };

    if (remainingValues.length) nextFilters[parameterSlug] = remainingValues;
    else delete nextFilters[parameterSlug];

    return nextFilters;
};
