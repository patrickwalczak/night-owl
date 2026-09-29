'use client';

import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/client';
import { type ResponsiveStrategy } from '@/shared/model/device.model';

import {
    selectIsDesktop,
    selectIsMobile,
    selectIsTablet,
    selectResponsiveType,
} from './model/deviceSelectors';
import { setViewportType } from './model/deviceSlice';
import {
    selectIsNavigationVisible,
    selectNavigationTopOffset,
} from './model/navigationSelectors';
import { setNavigationVisibility } from './model/navigationSlice';

export {
    setViewportType,
    selectIsDesktop,
    selectIsMobile,
    selectIsNavigationVisible,
    selectIsTablet,
    selectNavigationTopOffset,
    selectResponsiveType,
    setNavigationVisibility,
};

export const useIsDesktop = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsDesktop(state, strategy));

export const useIsTablet = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsTablet(state, strategy));

export const useIsMobile = (strategy?: ResponsiveStrategy) => useAppSelector(state => selectIsMobile(state, strategy));

export const useIsNavigationVisible = () => useAppSelector(selectIsNavigationVisible);

export const useNavigationTopOffset = () => useAppSelector(selectNavigationTopOffset);

export const useSetNavigationVisibility = () => {
    const dispatch = useAppDispatch();

    return useCallback((isNavigationVisible: boolean) => {
        dispatch(setNavigationVisibility({ isNavigationVisible }));
    },
    [dispatch],
    );
};
