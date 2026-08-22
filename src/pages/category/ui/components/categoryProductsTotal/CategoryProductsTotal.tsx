'use client';

import { useCategoryPageSelector } from '../../../model/client';

const CategoryProductsTotal = () => {
    const productSum = useCategoryPageSelector(state => state.categoryListing.productSum);

    return (
        <span className={'text-sm'}>
            {`${productSum} results`}
        </span>
    );
};

export default CategoryProductsTotal;
