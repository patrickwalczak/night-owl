'use client';

import dynamic from 'next/dynamic';
import useMediaQuery from '@/hooks/useMediaQuery';
import FilterButton from '../filterButton/FilterButton';

const FiltersDialog = dynamic(() => import('./FiltersDialog'), {
	ssr: false,
	loading: () => <FilterButton label={'Filters'} handleClick={() => {}} />,
});

export default function FiltersDialogMobile() {
	const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');

	if (isMobileOrTablet === null) return <FilterButton label={'Filters'} handleClick={() => {}} />;

	if (!isMobileOrTablet) return null;

	return <FiltersDialog />;
}
