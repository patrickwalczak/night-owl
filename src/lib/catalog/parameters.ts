import prisma from '../../../prisma/prisma';

export async function getParametersForCategory(categoryId: string) {
	// Parent + direct children (matches your listing scope)
	const children = await prisma.category.findMany({
		where: { parentId: categoryId },
		select: { id: true },
	});
	const categoryIds = [categoryId, ...children.map((c) => c.id)];

	// Any Parameter that’s attached to any of those categories
	const params = await prisma.parameter.findMany({
		where: { categories: { some: { categoryId: { in: categoryIds } } } },
		select: {
			id: true,
			name: true,
			values: { select: { id: true, value: true }, orderBy: { value: 'asc' } },
		},
		orderBy: { name: 'asc' },
	});

	return params;
}
