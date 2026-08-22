import '../src/shared/styles/index.scss';
import { Playfair_Display, Inter } from 'next/font/google';
import { headers } from 'next/headers';

import AppClient from '@/app/ui/AppClient';
import { isDeviceType } from '@/shared/model/device.model';
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
    const deviceTypeHeader = (await headers()).get('x-device-type');
    const initialDeviceType = isDeviceType(deviceTypeHeader) ? deviceTypeHeader : 'desktop';

    return (
        <html lang={'en'} className={`${inter.variable} ${playfair.variable}`}>
            <body>
                <StoreProvider initialDeviceType={initialDeviceType}>
                    <AppClient>
                        <NavigationServer />
                        {children}
                    </AppClient>
                </StoreProvider>
            </body>
        </html>
    );
}
