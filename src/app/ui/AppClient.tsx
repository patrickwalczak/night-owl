'use client';

import type React from 'react';

import { useDeviceType } from '@/shared/lib/hooks/useDeviceType';

const AppClient = ({ children }: { children: React.ReactNode }) => {
    useDeviceType();

    return children;
};

export default AppClient;
