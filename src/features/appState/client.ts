'use client';

import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/client';
import { type ResponsiveStrategy } from '@/shared/model/device.model';

import { toggleNavigation } from './model/navigationSlice';
import {
    selectInitialDeviceType,
    selectIsDesktop,
    selectIsMobile,
    selectIsNavigationOpen,
    selectIsTablet,
    selectIsViewportReady,
    selectResponsiveType,
    selectViewportType,
} from './model/selectors';

export const useInitialDeviceType = () => useAppSelector(selectInitialDeviceType);

export const useViewportType = () => useAppSelector(selectViewportType);

export const useIsViewportReady = () => useAppSelector(selectIsViewportReady);

export const useResponsiveType = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectResponsiveType(state, strategy));

export const useIsDesktop = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsDesktop(state, strategy));

export const useIsTablet = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsTablet(state, strategy));

export const useIsMobile = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsMobile(state, strategy));

export const useIsNavigationOpen = () => useAppSelector(selectIsNavigationOpen);

export const useSetNavigationOpen = () => {
    const dispatch = useAppDispatch();

    return useCallback((isNavigationOpen: boolean) => {
        dispatch(toggleNavigation({ isNavigationOpen }));
    },
    [dispatch],
    );
};
