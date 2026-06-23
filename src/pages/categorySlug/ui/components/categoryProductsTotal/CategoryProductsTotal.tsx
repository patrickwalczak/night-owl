'use client';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';

import { CatalogContext } from '../../../model/providers/CatalogProvider';

const CategoryProductsTotal = () => {
    const { productSum } = useSafeContext(CatalogContext);

    return (
        <span className={'text-sm'}>
            {`${productSum} results`}
        </span>
    );
};

export default CategoryProductsTotal;
