import '../src/shared/styles/index.scss';
import { Playfair_Display, Inter } from 'next/font/google';

import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import StoreProvider from '@/app/providers/StoreProvider';
import { NavigationServer } from '@/widgets/navigation/server';

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
        <html lang={'en'} className={`${inter.variable} ${playfair.variable}`}>
            <body>
                <StoreProvider>
                    <ReactQueryProvider>
                        <NavigationServer />
                        {children}
                    </ReactQueryProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
