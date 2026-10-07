import { type DialogProps } from './Dialog';

type DrawerProps<T> = T extends unknown
    ? Omit<T, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>
    : never;

export type DialogDrawerProps = DrawerProps<DialogProps> & {
    side?: 'left' | 'right';
    /** Animation duration in milliseconds. Defaults to 300. */
    timeout?: number;
};
