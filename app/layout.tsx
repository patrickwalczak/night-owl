import '../src/shared/styles/index.scss';
import { Playfair_Display, Inter } from 'next/font/google';
import { headers } from 'next/headers';

import AppClient from '@/app/ui/AppClient';
import { type DeviceType } from '@/shared/model/device.model';
import { NavigationServer } from '@/widgets/navigation/server';

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
