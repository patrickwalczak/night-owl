'use server';

import { SortOrderKeys } from '@/types/catalog.models';
import prisma from '../prisma/prisma';

const PAGE_SIZE = 20;

function toOrderBy(sort: SortOrderKeys) {
	switch (sort) {
		case 'price_asc':
			return { price: 'asc' as const };
		case 'price_desc':
			return { price: 'desc' as const };
		case 'newest':
			return { createdAt: 'desc' as const };
		default:
			return { createdAt: 'desc' as const };
	}
}

export async function getProductsForCategory(opts: {
	categoryId: string;
	page: number;
	sort: SortOrderKeys;
	paramValueIds?: string[];
	query?: string;
}) {
	const children = await prisma.category.findMany({
		where: { parentId: opts.categoryId },
		select: { id: true },
	});
	const categoryIds = [opts.categoryId, ...children.map((c) => c.id)];

	const where: any = { categoryId: { in: categoryIds }, inStock: true };

	if (opts.query) where.name = { contains: opts.query, mode: 'insensitive' };

	if (opts.paramValueIds?.length) {
		where.parameterValues = {
			some: { parameterValueId: { in: opts.paramValueIds } },
		};
	}

	const [items, total] = await Promise.all([
		prisma.product.findMany({
			where,
			orderBy: toOrderBy(opts.sort),
			skip: (opts.page - 1) * PAGE_SIZE,
			take: PAGE_SIZE,
			select: {
				id: true,
				name: true,
				slug: true,
				price: true,
				image: true,
				status: true,
			},
		}),
		prisma.product.count({ where }),
	]);

	return { items, total, pageSize: PAGE_SIZE };
}
