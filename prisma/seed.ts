// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
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

	for (const name of manufacturers) {
		await prisma.manufacturer.upsert({
			where: { name },
			update: {},
			create: {
				name,
			},
		});
	}

	console.log('✅ Manufacturers seeded');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
