'use client';

import React, { useState } from 'react';

import styles from './sideFiltersDesktop.module.scss';
import FiltersWrapper from './FiltersWrapper';
import { useSearchParams } from 'next/navigation';
import ParameterGroup from '../parameterGroup/ParameterGroup';
import FilterActions from '../filtersDialogMobile/filterActions/FilterActions';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggleFilters } from '@/lib/store/features/catalog/catalogSlice';

const SideFiltersDesktop = () => {
	const parameters = useAppSelector((state) => state.catalog.parameters);
	const dispatch = useAppDispatch();

	const searchParams = useSearchParams();

	const initialParamIds = (searchParams.get('params') ?? '').split(',').filter(Boolean);

	const [selectedParamIds, setSelectedParamIds] = useState<string[]>(initialParamIds);

	return (
		<FiltersWrapper>
			<div className={styles.filters}>
				{parameters.map((param) => (
					<ParameterGroup
						key={param.id}
						parameter={param}
						selectedParamIds={selectedParamIds}
						setSelectedParamIds={setSelectedParamIds}
					/>
				))}
				<FilterActions selectedParamIds={selectedParamIds} close={() => dispatch(toggleFilters())} />
			</div>
		</FiltersWrapper>
	);
};

export default SideFiltersDesktop;
