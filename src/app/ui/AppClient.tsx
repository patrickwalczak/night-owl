'use client';

import type React from 'react';

import { useSyncViewportType } from '@/app/lib/useSyncViewportType';

const AppClient = ({ children }: { children: React.ReactNode }) => {
    useSyncViewportType();

    return children;
};

export default AppClient;
