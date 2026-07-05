import { PrismaPg } from '@prisma/adapter-pg';
import slugify from 'slugify';

import { PrismaClient } from '../../src/shared/lib/db/generated/client';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function addProduct(
    categorySlug: string,
    parameterName: string,
    parameterValue: string,
    productName: string,
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

interface ProductSeed {
    categorySlug: string;
    parameterName: string;
    parameterValue: string;
    productName: string;
}

const generateProducts = (): ProductSeed[] => {
    const products: ProductSeed[] = [];
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
            );
        }
        catch (error) {
            console.error(`Failed to insert ${product.productName}:`, error);
        }
    }
}
