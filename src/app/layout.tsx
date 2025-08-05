import './globals.scss';
import '../styles/utils.scss';
import { Playfair_Display, Inter } from 'next/font/google';
import StoreProvider from './StoreProvider';

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${playfair.variable}`}>
			<body>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
