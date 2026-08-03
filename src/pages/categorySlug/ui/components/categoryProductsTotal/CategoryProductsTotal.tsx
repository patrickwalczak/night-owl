'use client';

import { useCatalogSelector } from '../../../model/client';

const CategoryProductsTotal = () => {
    const productSum = useCatalogSelector(state => state.catalog.productSum);

    return (
        <span className={'text-sm'}>
            {`${productSum} results`}
        </span>
    );
};

export default CategoryProductsTotal;
