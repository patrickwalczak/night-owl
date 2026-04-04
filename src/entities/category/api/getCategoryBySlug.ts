'use server';

import { cache } from 'react';
import { prisma } from '../../../shared/lib/db/prisma';

export const getCategoryBySlug = cache(async (slug: string) => {
	return prisma.category.findUnique({
		where: { slug },
		select: {
			id: true,
			name: true,
			slug: true,
			parentId: true,
			children: { select: { id: true, name: true, slug: true, _count: { select: { products: true } } } },
		},
	});
});
