'use client';

import { useCatalog } from '../../../model/providers/CatalogProvider';

const CategoryProductsTotal = () => {
    const { productSum } = useCatalog();

    return (
        <span className={'text-sm'}>
            {`${productSum} results`}
        </span>
    );
};

export default CategoryProductsTotal;
