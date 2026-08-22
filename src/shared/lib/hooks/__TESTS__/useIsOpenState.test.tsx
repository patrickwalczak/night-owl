import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useIsOpenState } from '../useIsOpenState';

describe('useIsOpenState', () => {
    it('opens and closes state', () => {
        const { result } = renderHook(() => useIsOpenState());

        expect(result.current.isOpened).toBe(false);

        act(() => {
            result.current.open();
        });

        expect(result.current.isOpened).toBe(true);

        act(() => {
            result.current.close();
        });

        expect(result.current.isOpened).toBe(false);
    });

    it('toggles state', () => {
        const { result } = renderHook(() => useIsOpenState());

        expect(result.current.isOpened).toBe(false);

        act(() => {
            result.current.toggle();
        });

        expect(result.current.isOpened).toBe(true);

        act(() => {
            result.current.toggle();
        });

        expect(result.current.isOpened).toBe(false);
    });
});
