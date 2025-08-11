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

// Product list card (for grids/catalogs)
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

// Product detail with parameter values (flattened)
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

	// e.g. [{ parameter: "Color", values: [{value:"Red", count: 10}, ...] }]
	parameters: Array<{
		parameterId: string;
		parameterName: string;
		values: Array<{ parameterValueId: string; value: string; count: number }>;
	}>;
}
