import { type ViewTransitionInstance } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { animateDrawerTransition } from '../animateDrawerTransition';

afterEach(() => vi.unstubAllGlobals());

describe('drawer ViewTransition animation', () => {
    it.each([
        ['left', 'enter', '-100%', 'new'],
        ['right', 'enter', '100%', 'new'],
        ['left', 'exit', '-100%', 'old'],
        ['right', 'exit', '100%', 'old'],
    ] as const)('slides %s on %s using the %s offset', (side, phase, offset, target) => {
        vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
        const cancel = vi.fn();
        const animateNew = vi.fn(() => ({ cancel }));
        const animateOld = vi.fn(() => ({ cancel }));
        const instance = { new: { animate: animateNew }, old: { animate: animateOld } } as unknown as ViewTransitionInstance;
        const dispose = animateDrawerTransition(instance, side, phase);
        const animate = target === 'new' ? animateNew : animateOld;
        const hidden = { transform: `translateX(${offset})`, opacity: phase === 'enter' ? 0 : 1 };
        const visible = { transform: 'translateX(0)', opacity: 1 };
        expect(animate).toHaveBeenCalledWith(
            phase === 'enter' ? [hidden, visible] : [visible, hidden],
            expect.objectContaining({ duration: 300, easing: 'cubic-bezier(0, 0, 0.2, 1)', fill: 'both' }),
        );
        expect(target === 'new' ? animateOld : animateNew).not.toHaveBeenCalled();
        dispose?.();
        expect(cancel).toHaveBeenCalledOnce();
    });

    it.each([0, 450])('uses a custom timeout of %s ms for both phases', (timeout) => {
        vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
        const animate = vi.fn((_frames: Keyframe[], _options: KeyframeAnimationOptions) => ({ cancel: vi.fn() }));
        const instance = { new: { animate }, old: { animate } } as unknown as ViewTransitionInstance;
        animateDrawerTransition(instance, 'right', 'enter', timeout);
        animateDrawerTransition(instance, 'right', 'exit', timeout);
        expect(animate).toHaveBeenCalledTimes(2);
        for (const [, options] of animate.mock.calls) {
            expect(options.duration).toBe(timeout);
        }
    });

    it('respects reduced motion', () => {
        vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
        const animate = vi.fn();
        const instance = { new: { animate }, old: { animate } } as unknown as ViewTransitionInstance;
        animateDrawerTransition(instance, 'right', 'enter');
        expect(animate).not.toHaveBeenCalled();
    });
});
