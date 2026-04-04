'use server';

import { prisma } from '../../../shared/lib/db/prisma';

export async function getSubcategories(parentId: string) {
	return prisma.category.findMany({
		where: { parentId },
		select: { id: true, name: true, slug: true },
		orderBy: { name: 'asc' },
	});
}
