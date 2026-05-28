import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../src/shared/lib/db/generated/client';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const parameter = await prisma.parameter.findUnique({
        where: { name: 'Manufacturer' },
    });

    if (!parameter) {
        throw new Error('Parameter "Manufacturer" not found.');
    }

    const categories = await prisma.category.findMany();

    for (const category of categories) {
        const existingLink = await prisma.categoryParameter.findFirst({
            where: {
                categoryId: category.id,
                parameterId: parameter.id,
            },
        });

        if (!existingLink) {
            await prisma.categoryParameter.create({
                data: {
                    categoryId: category.id,
                    parameterId: parameter.id,
                },
            });

            console.log(`✅ Linked "${category.name}" with "Manufacturer"`);
        }
        else {
            console.log(`⚠️ Already linked: "${category.name}"`);
        }
    }
}
