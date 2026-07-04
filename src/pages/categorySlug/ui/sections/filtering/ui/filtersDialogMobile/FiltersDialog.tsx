'use client';

import { useIsOpenState } from '@/shared/lib/hooks/client';

import FilterButton from '../filterButton/FilterButton';
import FiltersModal from './filtersModal/FiltersModal';

const FiltersDialog = () => {
    const { isOpened, close, open } = useIsOpenState();

    return (
        <>
            <FilterButton label={'Filters'} handleClick={open} />
            <FiltersModal isOpened={isOpened} close={close} />
        </>
    );
};

export default FiltersDialog;
