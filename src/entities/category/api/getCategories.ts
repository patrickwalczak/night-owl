import 'server-only';

import { cache } from 'react';

import { type SimpleCategoryModelType } from '@/types/category.model';

import { prisma } from '../../../shared/lib/db/prisma';

export const getCategories = cache(async function getCategories(): Promise<SimpleCategoryModelType[]> {
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
