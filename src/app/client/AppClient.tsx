'use client';

import { useDeviceType } from '@/shared/hooks/useDeviceType';
import React from 'react';

const AppClient = ({ children }: { children: React.ReactNode }) => {
	useDeviceType();

	return <>{children}</>;
};

export default AppClient;
