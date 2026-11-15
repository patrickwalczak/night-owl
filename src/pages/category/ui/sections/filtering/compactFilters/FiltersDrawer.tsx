import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { Drawer } from '@/shared/ui/drawer';

import { FilterActions } from '../filterActions/FilterActions';
import styles from './filtersDrawer.module.scss';

interface FiltersDrawerType {
    isOpen: boolean;
    close: () => void;
    children: ReactNode;
}

export const FiltersDrawer = ({ isOpen, close, children }: FiltersDrawerType) => {
    return (
        <Drawer.Main open={isOpen} onClose={close} position={'left'}>
            <div
                id={'filters-modal'}
                className={cn(styles.modal)}
            >
                <Drawer.Header>
                    <Drawer.Heading>{'Filters'}</Drawer.Heading>
                    <Drawer.Close />
                </Drawer.Header>

                <div className={cn(styles.body, 'flex', 'flex-col')}>
                    {children}
                </div>
                <FilterActions className={styles.actions} onApply={close} />
            </div>
        </Drawer.Main>
    );
};
