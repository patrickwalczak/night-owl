import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const products: Prisma.ProductCreateInput[] = [
	{
		name: 'Aurora Glow Table Lamp',
		price: 79,
		img_url: '',
	},
	{
		name: 'Lunar Halo Floor Lamp',
		price: 149,
		img_url: '',
	},
	{
		name: 'Eclipse LED Desk Lamp',
		price: 89,
		img_url: '',
	},
	{
		name: 'Midnight Luxe Pendant Lamp',
		price: 199,
		img_url: '',
	},
	{
		name: 'Starlight Crystal Chandelier',
		price: 299,
		img_url: '',
	},
	{
		name: 'Celestial Orb Night Lamp',
		price: 49,
		img_url: '',
	},
	{
		name: 'Solar Flare Wall Lamp',
		price: 119,
		img_url: '',
	},
	{
		name: 'Neon Horizon LED Strip Lamp',
		price: 59,
		img_url: '',
	},
	{
		name: 'Twilight Touch Sensor Lamp',
		price: 69,
		img_url: '',
	},
	{
		name: 'Vintage Moonbeam Lantern',
		price: 89,
		img_url: '',
	},
];

export async function main() {
	for (const u of products) {
		await prisma.product.create({ data: u });
	}
}

main();
