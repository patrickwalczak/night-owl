import '../src/app/styles/globals.scss';
import '../src/app/styles/utils.scss';
import { Playfair_Display, Inter } from 'next/font/google';
import { headers } from 'next/headers';

import AppClient from '@/app/ui/AppClient';
import { type DeviceType } from '@/types/device.model';
import NavigationServer from '@/widgets/navigation/ui/NavigationServer';

import StoreProvider from '../src/app/providers/StoreProvider';

export const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

export const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
	display: 'swap',
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const device = (await headers()).get('x-device-type') as DeviceType;

	return (
		<html lang={'en'} className={`${inter.variable} ${playfair.variable}`}>
			<body>
				<StoreProvider device={device}>
					<AppClient>
						<NavigationServer />
						{children}
					</AppClient>
				</StoreProvider>
			</body>
		</html>
	);
}
