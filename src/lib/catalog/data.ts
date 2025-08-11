import { cache } from 'react';
import type { SortKey } from './types';
import prisma from '../../../prisma/prisma';

const PAGE_SIZE = 20;

export const getCategoryBySlug = cache(async (slug: string) => {
	return prisma.category.findUnique({
		where: { slug },
		select: { id: true, name: true, slug: true, parentId: true },
	});
});

function toOrderBy(sort: SortKey) {
	switch (sort) {
		case 'price_asc':
			return { price: 'asc' as const };
		case 'price_desc':
			return { price: 'desc' as const };
		case 'newest':
			return { createdAt: 'desc' as const };
		default:
			return { createdAt: 'desc' as const }; // fallback “popularity”
	}
}

export async function getProductsForCategory(opts: {
	categoryId: string;
	page: number;
	sort: SortKey;
	paramValueIds?: string[];
	q?: string;
	priceMin?: number;
	priceMax?: number;
}) {
	const children = await prisma.category.findMany({
		where: { parentId: opts.categoryId },
		select: { id: true },
	});
	const categoryIds = [opts.categoryId, ...children.map((c) => c.id)];

	const where: any = { categoryId: { in: categoryIds }, inStock: true };

	if (opts.q) where.name = { contains: opts.q, mode: 'insensitive' };

	if (opts.priceMin != null || opts.priceMax != null) {
		where.price = {};
		if (opts.priceMin != null) where.price.gte = opts.priceMin;
		if (opts.priceMax != null) where.price.lte = opts.priceMax;
	}

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

	return { items, total, pageSize: PAGE_SIZE, _debugWhere: where };
}
