import { type Category } from '@/shared/lib/db/generated/client';

import { type ProductStatus } from '../../entities/product/model/product.types';
import { type ParameterModelType } from './parameter.model';

export interface CategoryParameter {
    id: string;
    categoryId: string;
    parameterId: string;

    category?: Category;
    parameter?: ParameterModelType;
}

export interface ProductCardModel {
    id: string;
    name: string;
    slug: string;
    price: number;
    currency: string;
    image: string;
    inStock: boolean;
    status: ProductStatus;
    category: { id: string; slug: string; name: string };
}

export interface ProductDetailModel {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    currency: string;
    image: string;
    inStock: boolean;
    status: ProductStatus;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    category: { id: string; name: string; slug: string };

    parameters: {
        parameterId: string;
        parameterName: string;
        values: { parameterValueId: string; value: string; count: number }[];
    }[];
}
