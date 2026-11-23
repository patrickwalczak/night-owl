import type { ParameterGetPayload } from '@/shared/lib/db';

import type { categoryPageParameterSelect } from './categoryPage.select';

export type RawCategoryParameter = ParameterGetPayload<{
    select: ReturnType<typeof categoryPageParameterSelect>;
}>;

export type CategoryParameterValue = Omit<RawCategoryParameter['values'][number], '_count'> & {
    count: number;
};

export type CategoryParameter = Omit<RawCategoryParameter, 'values'> & {
    values: CategoryParameterValue[];
};

export interface SelectedFilter {
    parameterSlug: string;
    parameterValueSlug: string;
    checked: boolean;
}
