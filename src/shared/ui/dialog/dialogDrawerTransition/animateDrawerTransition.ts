import { type ViewTransitionInstance } from 'react';

export const animateDrawerTransition = (
    instance: ViewTransitionInstance,
    side: 'left' | 'right',
    phase: 'enter' | 'exit',
    timeout = 300,
) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const entering = phase === 'enter';
    const element = entering ? instance.new : instance.old;

    const hidden = {
        transform: `translateX(${side === 'left' ? '-100%' : '100%'})`,
        opacity: entering ? 0 : 1,
    };

    const visible = {
        transform: 'translateX(0)',
        opacity: 1,
    };

    const animation = element.animate(
        entering ? [hidden, visible] : [visible, hidden],
        {
            duration: timeout,
            easing: 'cubic-bezier(0, 0, 0.2, 1)',
            fill: 'both',
        },
    );

    return () => animation.cancel();
};
