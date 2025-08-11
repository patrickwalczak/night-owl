'use client';

import useIsOpenState from '@/hooks/useIsOpenState';
import React from 'react';
import FilterButton from '../../filterButton/FilterButton';
import ParametersModal from '../parametersModal/ParametersModal';

const ParametersController = () => {
	const { isOpened, close, open } = useIsOpenState();

	return (
		<>
			<FilterButton label={'Filters'} handleClick={open} />
			<ParametersModal isOpened={isOpened} close={close} />
		</>
	);
};

export default ParametersController;
