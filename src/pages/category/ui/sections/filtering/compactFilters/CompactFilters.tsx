'use client';

import { useOpenState } from '@/shared/lib/hooks/useOpenState/client';
import { cn } from '@/shared/lib/utils/cn';
import { FiltersIcon } from '@/shared/ui/icons';

import { FiltersDrawer } from './FiltersDrawer';
import styles from './filtersDrawer.module.scss';

export const CompactFilters = () => {
    const { isOpen, close, open } = useOpenState();

    return (
        <>
            <button
                onClick={open}
                className={cn(styles.modalButton, 'button-empty', 'flex')}
            >
                {'Filters'}
                <FiltersIcon />
            </button>
            <FiltersDrawer isOpen={isOpen} close={close} />
        </>
    );
};
