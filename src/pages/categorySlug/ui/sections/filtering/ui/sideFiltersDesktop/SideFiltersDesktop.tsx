'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils/cn';

import { CatalogContext } from '../../../../../model/providers/CatalogProvider';
import { CatalogUrlActionsContext } from '../../../../../model/providers/CatalogUrlActionsProvider';
import FilterActions from '../filtersDialogMobile/filterActions/FilterActions';
import ParameterGroup from '../parameterGroup/ParameterGroup';
import FiltersWrapper from './FiltersWrapper';
import styles from './sideFiltersDesktop.module.scss';
import { getIdsFromSearchParams } from '@/shared/lib/utils/url';

const SideFiltersDesktop = () => {
	const { subcategories, parameters } = useSafeContext(CatalogContext);
	const { searchParams } = useSafeContext(CatalogUrlActionsContext);
	const filtersRef = useRef<HTMLDivElement | null>(null);
	const [scrollableHeight, setScrollableHeight] = useState('100vh');

	const [selectedParamIds, setSelectedParamIds] = useState<string[]>(() => getIdsFromSearchParams(searchParams));

	useEffect(() => {
		setSelectedParamIds(getIdsFromSearchParams(searchParams));
	}, [searchParams]);

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
				<div className={cn(styles.content, 'flex', 'flex-col')}>
					{subcategories.length > 0 && (
						<div className={cn(styles.subcategories, 'flex', 'flex-col')}>
							{subcategories.map((subcategory) => (
								<Link
									className={cn(styles.subcategory, 'truncate')}
									key={subcategory.id}
									href={`/category/${subcategory.slug}`}
								>
									{subcategory.name}
								</Link>
							))}
						</div>
					)}

					{parameters.map((param) => (
						<ParameterGroup
							key={param.id}
							parameter={param}
							selectedParamIds={selectedParamIds}
							setSelectedParamIds={setSelectedParamIds}
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
