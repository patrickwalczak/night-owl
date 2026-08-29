import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useOpenState } from '../useOpenState';

describe('useOpenState', () => {
    it('opens and closes state', () => {
        const { result } = renderHook(() => useOpenState());

        expect(result.current.isOpen).toBe(false);

        act(() => {
            result.current.open();
        });

        expect(result.current.isOpen).toBe(true);

        act(() => {
            result.current.close();
        });

        expect(result.current.isOpen).toBe(false);
    });

    it('toggles state', () => {
        const { result } = renderHook(() => useOpenState());

        expect(result.current.isOpen).toBe(false);

        act(() => {
            result.current.toggle();
        });

        expect(result.current.isOpen).toBe(true);

        act(() => {
            result.current.toggle();
        });

        expect(result.current.isOpen).toBe(false);
    });
});
