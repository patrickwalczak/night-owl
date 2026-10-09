import { type MouseEvent } from 'react';

export const isClickOutsideElement = (event: MouseEvent<HTMLElement>): boolean => {
    if (event.target !== event.currentTarget) return false;

    const rect = event.currentTarget.getBoundingClientRect();

    return event.clientX < rect.left
        || event.clientX > rect.right
        || event.clientY < rect.top
        || event.clientY > rect.bottom;
};
