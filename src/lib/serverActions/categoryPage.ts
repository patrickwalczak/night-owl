import { cache } from 'react';
import { SortOrderKeys } from '@/types/catalog.models';
import prisma from 'prisma/prisma';

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

type FetchOpts = {
	page?: number;
	sort: SortOrderKeys;
	paramValueIds?: string[];
	query?: string;
};

export const getCategoryPageData = cache(async (slug: string, opts: FetchOpts) => {
	const page = Math.max(1, opts.page ?? 1);

	const whereProducts: any = {
		OR: [{ category: { slug } }, { category: { parent: { slug } } }],
	};

	if (opts.paramValueIds?.length) {
		whereProducts.parameterValues = {
			some: { parameterValueId: { in: opts.paramValueIds } },
		};
	}

	const [category, items, total, parameters] = await prisma.$transaction(
		[
			prisma.category.findUnique({
				where: { slug },
				select: {
					id: true,
					name: true,
					slug: true,
					parentId: true,
					children: { select: { id: true, name: true, slug: true, _count: { select: { products: true } } } },
				},
			}),
			prisma.product.findMany({
				where: whereProducts,
				orderBy: toOrderBy(opts.sort),
				skip: (page - 1) * PAGE_SIZE,
				take: PAGE_SIZE,
				select: { id: true, name: true, slug: true, price: true, image: true, status: true },
			}),
			prisma.product.count({ where: whereProducts }),
			prisma.parameter.findMany({
				where: {
					categories: {
						some: {
							category: {
								OR: [{ slug }, { parent: { slug } }],
							},
						},
					},
				},
				orderBy: { name: 'asc' },
				select: {
					id: true,
					name: true,
					values: {
						select: { id: true, value: true, count: true },
						orderBy: { value: 'asc' },
					},
				},
			}),
		],
		{ isolationLevel: 'RepeatableRead' }
	);

	return {
		category,
		products: { items, total, pageSize: PAGE_SIZE, page },
		parameters,
	};
});
