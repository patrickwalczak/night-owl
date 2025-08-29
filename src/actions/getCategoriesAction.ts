import { SimpleCategoryModelType } from '@/types/category.model';
import prisma from '../lib/prisma/prisma';
import { cache } from 'react';

export const getCategoriesAction = cache(async function getCategoriesAction(): Promise<SimpleCategoryModelType[]> {
	try {
		return prisma.category.findMany({
			where: { parentId: null },
			select: {
				id: true,
				name: true,
				slug: true,
				parentId: true,
				children: {
					select: {
						id: true,
						name: true,
						slug: true,
						_count: { select: { products: true } },
					},
				},
			},
		});
	} catch (error) {
		console.log(error);
		return [];
	}
});
