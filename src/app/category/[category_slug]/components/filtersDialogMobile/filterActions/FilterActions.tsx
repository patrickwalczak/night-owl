import React from 'react';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './filterActions.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_SORT_ORDER } from '@/constants';

const FilterActions = ({
	close,
	sort,
	selectedParamIds,
}: {
	close: () => void;
	sort?: string;
	selectedParamIds: string[];
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	function replaceParams(next: URLSearchParams) {
		next.delete('page');
		router.replace(`${pathname}?${next.toString()}`, { scroll: false });
	}

	function onApply() {
		const next = new URLSearchParams(searchParams.toString());

		if (sort && sort !== DEFAULT_SORT_ORDER) next.set('sort', sort);
		else next.delete('sort');

		if (selectedParamIds.length) {
			next.set('params', selectedParamIds.join(','));
		} else {
			next.delete('params');
		}

		replaceParams(next);
		close();
	}

	function onReset() {
		const next = new URLSearchParams(searchParams.toString());
		['query', 'sort', 'params', 'page'].forEach((k) => next.delete(k));
		replaceParams(next);
		close();
	}

	return (
		<footer className={mergeClasses(styles.footer, 'flex', 'justify-between')}>
			<button type="button" className={mergeClasses(styles.resetBtn, styles.footerBtn)} onClick={onReset}>
				Reset
			</button>
			<button type="button" className={mergeClasses(styles.showBtn, styles.footerBtn)} onClick={onApply}>
				Show results
			</button>
		</footer>
	);
};

export default FilterActions;
