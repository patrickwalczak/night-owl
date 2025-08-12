import { Product, CategoryParameter } from '@prisma/client';

export interface Category {
	id: string;
	name: string;
	parentId: string | null;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
	parent?: Category | null;
	children?: Category[];
	products?: Product[];
	CategoryParameter?: CategoryParameter[];
}

export type CategoryLeaf = Pick<Category, 'id' | 'name' | 'slug'>;

export interface SimpleCategoryModelType {
	id: string;
	name: string;
	slug: string;
	children: CategoryLeaf[];
}
