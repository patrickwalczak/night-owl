'use server';

import { cache } from 'react';
import prisma from '../../../prisma/prisma';

export const getCategoryBySlug = cache(async (slug: string) => {
	return prisma.category.findUnique({
		where: { slug },
		select: { id: true, name: true, slug: true, parentId: true },
	});
});

export async function getSubcategories(parentId: string) {
	return prisma.category.findMany({
		where: { parentId },
		select: { id: true, name: true, slug: true },
		orderBy: { name: 'asc' },
	});
}

export async function getCategoryProductCountDirect(categoryId: string) {
	const children = await prisma.category.findMany({
		where: { parentId: categoryId },
		select: { id: true },
	});
	const ids = [categoryId, ...children.map((c) => c.id)];
	return prisma.product.count({ where: { categoryId: { in: ids } } });
}
