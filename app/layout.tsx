import '../src/shared/styles/index.scss';
import { Playfair_Display, Inter } from 'next/font/google';

import DeviceStoreProvider from '@/app/providers/DeviceStoreProvider';
import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import AppClient from '@/app/ui/AppClient';
import { NavigationServer } from '@/widgets/navigation/server';

// The initial layout waits for the request's device header to render the matching variant.
export const instant = false;

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
                <DeviceStoreProvider>
                    <ReactQueryProvider>
                        <AppClient>
                            <NavigationServer />
                            {children}
                        </AppClient>
                    </ReactQueryProvider>
                </DeviceStoreProvider>
            </body>
        </html>
    );
}
