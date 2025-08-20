import './globals.scss';
import '../styles/utils.scss';
import { Playfair_Display, Inter } from 'next/font/google';
import StoreProvider from './StoreProvider';
import NavigationServer from '../components/navigationServer/NavigationServer';
import { headers } from 'next/headers';
import { DeviceType } from '@/types/device.model';
import AppClient from '@/components/AppClient';

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
		<html lang="en" className={`${inter.variable} ${playfair.variable}`}>
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
