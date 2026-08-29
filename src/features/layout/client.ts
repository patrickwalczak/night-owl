'use client';

import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/client';
import { type ResponsiveStrategy } from '@/shared/model/device.model';

import {
    selectInitialDeviceType,
    selectIsDesktop,
    selectIsMobile,
    selectIsTablet,
    selectIsViewportReady,
    selectResponsiveType,
    selectViewportType,
} from './model/deviceSelectors';
import { setViewportType } from './model/deviceSlice';
import {
    selectIsNavigationVisible,
    selectNavigationHeight,
    selectNavigationTopOffset,
} from './model/navigationSelectors';
import { setNavigationVisibility } from './model/navigationSlice';

export {
    setViewportType,
    selectInitialDeviceType,
    selectIsDesktop,
    selectIsMobile,
    selectIsNavigationVisible,
    selectIsTablet,
    selectIsViewportReady,
    selectNavigationHeight,
    selectNavigationTopOffset,
    selectResponsiveType,
    selectViewportType,
    setNavigationVisibility,
};

export const useInitialDeviceType = () => useAppSelector(selectInitialDeviceType);

export const useViewportType = () => useAppSelector(selectViewportType);

export const useIsViewportReady = () => useAppSelector(selectIsViewportReady);

export const useResponsiveType = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectResponsiveType(state, strategy));

export const useIsDesktop = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsDesktop(state, strategy));

export const useIsTablet = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsTablet(state, strategy));

export const useIsMobile = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsMobile(state, strategy));

export const useIsNavigationVisible = () => useAppSelector(selectIsNavigationVisible);

export const useNavigationHeight = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectNavigationHeight(state, strategy));

export const useNavigationTopOffset = (strategy?: ResponsiveStrategy) => (
    useAppSelector(state => selectNavigationTopOffset(state, strategy))
);

export const useSetNavigationVisibility = () => {
    const dispatch = useAppDispatch();

    return useCallback((isNavigationVisible: boolean) => {
        dispatch(setNavigationVisibility({ isNavigationVisible }));
    },
    [dispatch],
    );
};
