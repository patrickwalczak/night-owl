import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
	for (const name of categories) {
		const slug = name
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');

		await prisma.category.upsert({
			where: { slug },
			update: {},
			create: {
				name,
				slug,
			},
		});
	}

	console.log('✅ Categories seeded.');
}

main()
	.catch((e) => {
		console.error('❌ Seed error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
