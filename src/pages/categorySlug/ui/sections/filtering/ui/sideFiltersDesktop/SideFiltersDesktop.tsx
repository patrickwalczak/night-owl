'use client';

import { useEffect, useRef, useState } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils/cn';
import { getIdsFromSearchParams } from '@/shared/lib/utils/url';

import { CatalogContext } from '../../../../../model/providers/CatalogProvider';
import { CatalogUrlActionsContext } from '../../../../../model/providers/CatalogUrlActionsProvider';
import FilterActions from '../filtersDialogMobile/filterActions/FilterActions';
import ParameterGroup from '../parameterGroup/ParameterGroup';
import FiltersWrapper from './FiltersWrapper';
import styles from './sideFiltersDesktop.module.scss';
import { Subcategories } from './Subcategories';

const SideFiltersDesktop = () => {
	const { parameters } = useSafeContext(CatalogContext);
	const { searchParams, setFilters } = useSafeContext(CatalogUrlActionsContext);
	const filtersRef = useRef<HTMLDivElement | null>(null);
	const [scrollableHeight, setScrollableHeight] = useState('100vh');

	const selectedParamIds = getIdsFromSearchParams(searchParams);

	useEffect(() => {
		const onScroll = () => {
			if (!filtersRef.current) return;
			const rect = filtersRef.current.getBoundingClientRect();
			setScrollableHeight(`${window.innerHeight - rect.y}px`);
		};

		onScroll();
		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<FiltersWrapper>
			<div ref={filtersRef} style={{ height: scrollableHeight }} className={cn(styles.filters, 'flex', 'flex-col')}>
				<Subcategories />

				<div className={cn(styles.content, 'flex', 'flex-col')}>
					{parameters.map((param) => (
						<ParameterGroup
							key={param.id}
							parameter={param}
							selectedParamIds={selectedParamIds}
							setSelectedFilters={setFilters}
						/>
					))}
				</div>

				<FilterActions.Root className={styles.actions} selectedParamIds={selectedParamIds}>
					<FilterActions.Apply />
					<FilterActions.Reset />
				</FilterActions.Root>
			</div>
		</FiltersWrapper>
	);
};

export default SideFiltersDesktop;
