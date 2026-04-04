'use server';

import { prisma } from '../../../shared/lib/db/prisma';

export async function getCategoryProductCountDirect(categoryId: string) {
	const children = await prisma.category.findMany({
		where: { parentId: categoryId },
		select: { id: true },
	});
	const ids = [categoryId, ...children.map((c) => c.id)];
	return prisma.product.count({ where: { categoryId: { in: ids } } });
}
