import { type ComponentPropsWithoutRef } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext/client';
import { cn } from '@/shared/lib/utils/cn';
import { CloseIcon } from '@/shared/ui/icons';

import styles from './drawer.module.scss';
import { DrawerContext } from './DrawerContext';

export const DrawerClose = ({ className, children, onClick, ...props }: ComponentPropsWithoutRef<'button'>) => {
    const { onClose } = useSafeContext(DrawerContext);
    return (
        <button
            type={'button'}
            aria-label={'Close drawer'}
            {...props}
            className={cn('button-empty', styles.close, className)}
            onClick={(event) => {
                onClick?.(event);
                if (!event.defaultPrevented) onClose();
            }}
        >
            {children ?? <CloseIcon />}
        </button>
    );
};
