import { SimpleCategoryModelType } from '@/types/category.model';
import prisma from '../../prisma/prisma';

export async function getCategoriesAction(): Promise<SimpleCategoryModelType[]> {
	try {
		return prisma.category.findMany({
			where: { parentId: null },
			select: { id: true, name: true, slug: true },
		});
	} catch (error) {
		console.log(error);
		return [];
	}
}
