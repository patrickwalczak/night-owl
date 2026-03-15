import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function addProduct(
	categorySlug: string,
	parameterName: string,
	parameterValue: string,
	productName: string,
	price: number
) {
	const category = await prisma.category.findUnique({
		where: { slug: categorySlug },
	});

	if (!category) throw new Error('Category not found');

	const parameter = await prisma.parameterValue.findFirst({
		where: {
			value: parameterValue,
			parameter: { name: parameterName },
		},
	});
	if (!parameter) throw new Error('Manufacturer not found');

	const product = await prisma.product.create({
		data: {
			name: productName,
			description:
				'This pendant lamp is the essence of style and elegance. Beautifully crafted as part of a stunning collection, it was designed to bring sophistication and charm to any space. Its composition fits seamlessly into both modern and classic interiors, creating a harmonious balance with other pieces in the series.',
			price,
			image: '',
			slug: slugify(productName, { lower: true }),
			category: { connect: { id: category.id } },
		},
	});

	await prisma.productParameterValue.create({
		data: {
			productId: product.id,
			parameterValueId: parameter.id,
		},
	});

	console.log('Product created:', product.name);
}

const categories = [
	'Hanging lamps',
	'Chandeliers',
	'Ceiling lamps',
	'Ceiling lights',
	'Wall lamps',
	'Floor lamps',
	'Desk lamps',
	'Table lamps',
];

const manufacturers = [
	'LumaLight Co.',
	'BrightNest',
	'GlowMark Lighting',
	'Aurora Fixtures',
	'Nocturne Lights',
	'Zenith Illumination',
	'HaloCraft',
	'LightWorx',
	'VividRay',
	'NexaLux',
];

const generateProducts = () => {
	const products = [];
	let globalCounter = 1;

	for (const category of categories) {
		const categorySlug = slugify(category, { lower: true });

		for (const manufacturer of manufacturers) {
			const numberOfProducts = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
			for (let i = 1; i <= numberOfProducts; i++) {
				const paddedId = String(globalCounter).padStart(3, '0');
				const name = `${category.slice(0, category.length - 1)} ${manufacturer.slice(0, 4)} ${paddedId}`;

				const product = {
					categorySlug,
					price: +(Math.random() * 100 + 50).toFixed(2),
					parameterName: 'Manufacturer',
					parameterValue: manufacturer,
					productName: name,
				};

				products.push(product);
				globalCounter++;
			}
		}
	}

	return products;
};

export async function seedProducts() {
	const products = generateProducts();

	for (const product of products) {
		try {
			await addProduct(
				product.categorySlug,
				product.parameterName,
				product.parameterValue,
				product.productName,
				product.price
			);
		} catch (error) {
			console.error(`Failed to insert ${product.productName}:`, error);
		}
	}
}
