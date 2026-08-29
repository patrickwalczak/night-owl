'use client';

import { useOpenState } from '@/shared/lib/hooks/client';

import FilterButton from '../filterButton/FilterButton';
import FiltersModal from './filtersModal/FiltersModal';

const FiltersDialog = () => {
    const { isOpen, close, open } = useOpenState();

    return (
        <>
            <FilterButton label={'Filters'} handleClick={open} />
            <FiltersModal isOpen={isOpen} close={close} />
        </>
    );
};

export default FiltersDialog;
