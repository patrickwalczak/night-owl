import { Category } from '@prisma/client';
import { ProductStatus } from './product.model';
import { ParameterModelType } from './parameter.model';

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

	parameters: Array<{
		parameterId: string;
		parameterName: string;
		values: Array<{ parameterValueId: string; value: string; count: number }>;
	}>;
}
