'use client';

import type React from 'react';

import { useDeviceType } from '@/features/appState/lib/useDeviceType';

const AppClient = ({ children }: { children: React.ReactNode }) => {
    useDeviceType();

    return children;
};

export default AppClient;
