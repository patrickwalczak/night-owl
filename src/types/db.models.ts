import { Category } from '@prisma/client';
import { ProductModelType, ProductStatus } from './product.model';

export interface Parameter {
	id: string;
	name: string;
	description?: string | null;
	createdAt: Date;
	updatedAt: Date;

	categories?: CategoryParameter[];
	values?: ParameterValue[];
}

export interface ParameterValue {
	id: string;
	value: string;
	count: number;

	parameterId: string;
	parameter?: Parameter;

	products?: ProductParameterValueModel[];
}

export interface ProductParameterValueModel {
	id: string;
	productId: string;
	parameterValueId: string;

	product?: ProductModelType;
	parameterValue?: ParameterValue;
}

export interface CategoryParameter {
	id: string;
	categoryId: string;
	parameterId: string;

	category?: Category;
	parameter?: Parameter;
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
