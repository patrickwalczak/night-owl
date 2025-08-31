'use server';

import 'server-only';
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

/** Shape you can use on the page */
export type ProductAttribute = {
	parameterId: string;
	parameterName: string;
	valueId: string;
	value: string;
};

export type ProductCard = {
	id: string;
	name: string;
	slug: string;
	price: number;
	image: string;
	status: import('@prisma/client').ProductStatus;
};

export type Breadcrumb = { id: string; name: string; slug: string };

export type FullProduct = {
	product: {
		id: string;
		name: string;
		description: string | null;
		price: number;
		currency: string;
		slug: string;
		quantity: number;
		inStock: boolean;
		image: string;
		status: import('@prisma/client').ProductStatus;
		createdAt: Date;
		updatedAt: Date;
		categoryId: string;
		category: { id: string; name: string; slug: string; parentId: string | null };
	};
	attributes: ProductAttribute[];
	breadcrumbs: Breadcrumb[];
	related: ProductCard[];
};

async function getBreadcrumbs(categoryId: string): Promise<Breadcrumb[]> {
	const crumbs: Breadcrumb[] = [];
	let current = await prisma.category.findUnique({
		where: { id: categoryId },
		select: { id: true, name: true, slug: true, parentId: true },
	});

	while (current) {
		crumbs.push({ id: current.id, name: current.name, slug: current.slug });
		if (!current.parentId) break;
		current = await prisma.category.findUnique({
			where: { id: current.parentId },
			select: { id: true, name: true, slug: true, parentId: true },
		});
	}

	return crumbs.reverse();
}

async function getRelatedFromCategory(categoryId: string, excludeId: string, take = 8): Promise<ProductCard[]> {
	const items = await prisma.product.findMany({
		where: { categoryId, inStock: true, NOT: { id: excludeId } },
		orderBy: { createdAt: 'desc' },
		take,
		select: { id: true, name: true, slug: true, price: true, image: true, status: true },
	});
	return items;
}

const productInclude = {
	category: { select: { id: true, name: true, slug: true, parentId: true } },
	parameterValues: {
		include: {
			parameterValue: {
				select: {
					id: true,
					value: true,
					parameter: { select: { id: true, name: true } },
				},
			},
		},
	},
} as const;

function mapAttributes(
	pv: Array<{ parameterValue: { id: string; value: string; parameter: { id: string; name: string } } }>
): ProductAttribute[] {
	return pv.map(({ parameterValue }) => ({
		parameterId: parameterValue.parameter.id,
		parameterName: parameterValue.parameter.name,
		valueId: parameterValue.id,
		value: parameterValue.value,
	}));
}

export async function getProductFullById(id: string): Promise<FullProduct | null> {
	if (!id) return null;

	const product = await prisma.product.findUnique({
		where: { id },
		include: productInclude,
	});

	if (!product) return null;

	const [breadcrumbs, related] = await Promise.all([
		getBreadcrumbs(product.categoryId),
		getRelatedFromCategory(product.categoryId, product.id),
	]);

	return {
		product,
		attributes: mapAttributes(product.parameterValues),
		breadcrumbs,
		related,
	};
}

export async function getProductFullBySlug(slug: string): Promise<FullProduct | null> {
	if (!slug) return null;

	const product = await prisma.product.findUnique({
		where: { slug },
		include: productInclude,
	});

	if (!product) return null;

	const [breadcrumbs, related] = await Promise.all([
		getBreadcrumbs(product.categoryId),
		getRelatedFromCategory(product.categoryId, product.id),
	]);

	return {
		product,
		attributes: mapAttributes(product.parameterValues),
		breadcrumbs,
		related,
	};
}
