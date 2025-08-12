import { Category } from './category.model';
import { ProductParameterValueModelType } from './parameter.model';

export type ProductStatus = 'NEW' | 'SALE' | 'PROMOTION' | 'DEFAULT';

export interface ProductModelType {
	id: string;
	name: string;
	description?: string | null;
	price: number;
	currency: 'USD' | 'EUR' | string; // tighten if you can
	slug: string;
	quantity: number; // 100 default in DB
	inStock: boolean; // true default in DB
	image: string;
	createdAt: string; // ISO string if coming over the wire
	updatedAt: string; // ISO string if coming over the wire
	status: ProductStatus; // DEFAULT in DB

	categoryId: string;
	category?: Category; // include only when you select/join it

	parameterValues?: ProductParameterValueModelType[];
}

export type ListingProductType = Pick<ProductModelType, 'id' | 'name' | 'slug' | 'image' | 'price' | 'status'>;
