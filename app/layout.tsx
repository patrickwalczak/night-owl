import '@/shared/styles/index.scss';
import { Playfair_Display, Inter } from 'next/font/google';

import { NavigationServer } from '@/widgets/navigation/server';

import { ReactQueryProvider } from '../src/app/providers/ReactQueryProvider';

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
                <ReactQueryProvider>
                    <NavigationServer />
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    );
}
