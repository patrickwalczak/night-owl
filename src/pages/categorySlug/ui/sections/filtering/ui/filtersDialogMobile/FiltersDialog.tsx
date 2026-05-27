'use client';

import FiltersModal from './filtersModal/FiltersModal';
import FilterButton from '../filterButton/FilterButton';
import useIsOpenState from '@/shared/hooks/useIsOpenState';

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
