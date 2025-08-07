export interface CategoryModelType {
	id: string;
	name: string;
	parentId: string | null;
	createdAt: Date;
	updatedAt: Date;
	slug: string;
}

export type SimpleCategoryModelType = Pick<CategoryModelType, 'id' | 'name' | 'slug'>;
