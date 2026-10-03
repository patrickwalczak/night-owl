'use client';

import { useOpenState } from '@/shared/lib/hooks/client';
import { cn } from '@/shared/lib/utils/cn';

import FilterButton from '../filterButton/FilterButton';
import FiltersModal from './FiltersModal';
import styles from './filtersModal.module.scss';

const FiltersDialog = () => {
    const { isOpen, close, open } = useOpenState();

    return (
        <div className={cn(styles.stickyBottom, 'flex', 'align-center')}>
            <FilterButton label={'Filters'} handleClick={open} className={cn(styles.modalButton, 'button-empty', 'flex')} />
            <FiltersModal isOpen={isOpen} close={close} />
        </div>
    );
};

export default FiltersDialog;
