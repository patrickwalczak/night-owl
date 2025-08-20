'use client';

import { useDeviceType } from '@/hooks/useDeviceType';
import React from 'react';

const AppClient = ({ children }: { children: React.ReactNode }) => {
	useDeviceType();

	return <>{children}</>;
};

export default AppClient;
