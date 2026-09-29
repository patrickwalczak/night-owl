'use client';

import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/client';

import {
    selectIsNavigationVisible,
    selectNavigationTopOffset,
} from './model/navigationSelectors';
import { setNavigationVisibility } from './model/navigationSlice';

export {
    selectIsNavigationVisible,
    selectNavigationTopOffset,
    setNavigationVisibility,
};

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
