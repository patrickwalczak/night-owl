'use client';

import React, { useEffect, useRef, useState } from 'react';

import styles from './sideFiltersDesktop.module.scss';
import FiltersWrapper from './FiltersWrapper';
import { useSearchParams } from 'next/navigation';
import ParameterGroup from '../parameterGroup/ParameterGroup';
import FilterActions from '../filtersDialogMobile/filterActions/FilterActions';
import { useAppSelector } from '@/lib/store/hooks';
import Link from 'next/link';
import { mergeClasses } from '@/utils/mergeClasses';

const SideFiltersDesktop = () => {
	const parameters = useAppSelector((state) => state.catalog.parameters);
	const subcategories = useAppSelector((state) => state.catalog.subcategories);
	const filtersRef = useRef<HTMLDivElement | null>(null);
	const [scrollableHeight, setScrollableHeight] = useState('100vh');

	const searchParams = useSearchParams();

	const initialParamIds = (searchParams.get('params') ?? '').split(',').filter(Boolean);

	const [selectedParamIds, setSelectedParamIds] = useState<string[]>(initialParamIds);

	useEffect(() => {
		const onScroll = () => {
			if (filtersRef.current) {
				const rect = filtersRef.current.getBoundingClientRect();

				const height = window.innerHeight - rect.y;
				setScrollableHeight(`${height}px`);
			}
		};

		onScroll();

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<FiltersWrapper>
			<div
				ref={filtersRef}
				style={{ height: scrollableHeight }}
				className={mergeClasses(styles.filters, 'flex', 'flex-col')}
			>
				<div className={mergeClasses(styles.content, 'flex', 'flex-col')}>
					<div className={mergeClasses(styles.subcategories, 'flex', 'flex-col')}>
						{subcategories.map((subcategory) => (
							<Link
								className={mergeClasses(styles.subcategory, 'truncate')}
								key={subcategory.id}
								href={`/category/${subcategory.slug}`}
							>
								{subcategory.name}
							</Link>
						))}
					</div>
					{parameters.map((param) => (
						<ParameterGroup
							key={param.id}
							parameter={param}
							selectedParamIds={selectedParamIds}
							setSelectedParamIds={setSelectedParamIds}
						/>
					))}
				</div>
				<FilterActions className={styles.actions} selectedParamIds={selectedParamIds}>
					<FilterActions.Apply />
					<FilterActions.Reset />
				</FilterActions>
			</div>
		</FiltersWrapper>
	);
};

export default SideFiltersDesktop;
