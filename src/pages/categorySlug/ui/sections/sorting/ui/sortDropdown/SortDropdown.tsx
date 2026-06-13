'use client';

import type React from 'react';

import { useId, useRef, useState } from 'react';

import { DEFAULT_SORT_ORDER, CATALOG_SORT_OPTIONS, CATALOG_SORT_VALUES } from '@/constants';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { type CatalogSortOrderType } from '@/types/catalog.models';
import { cn } from '@/shared/lib/utils/cn';

import { CatalogUrlActionsContext } from '../../../../../model/providers/CatalogUrlActionsProvider';
import styles from './styles.module.scss';

export default function SortDropdown({ className }: { className?: string }) {
	const { searchParams, setSort } = useSafeContext(CatalogUrlActionsContext);

	const initialSort = () => {
		const sortParam = searchParams.get('sort') as CatalogSortOrderType;

		if (sortParam && CATALOG_SORT_VALUES.includes(sortParam)) {
			return sortParam;
		}

		return DEFAULT_SORT_ORDER;
	};

	const [open, setOpen] = useState(false);
	const [sortKey, setSortKey] = useState<CatalogSortOrderType>(() => initialSort());
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const rootRef = useOutsideClick(() => setOpen(false));

	const buttonRef = useRef<HTMLButtonElement>(null);
	const itemsRef = useRef<HTMLLIElement[]>([]);

	const listboxId = useId();

	function onButtonKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			setOpen(true);
			setActiveIndex(
				Math.max(
					0,
					CATALOG_SORT_OPTIONS.findIndex((o) => o.value === sortKey)
				)
			);
			requestAnimationFrame(() => itemsRef.current[activeIndex]?.focus());
		}
	}

	function onItemKeyDown(e: React.KeyboardEvent, idx: number) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const next = (idx + 1) % CATALOG_SORT_OPTIONS.length;
			setActiveIndex(next);
			itemsRef.current[next]?.focus();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prev = (idx - 1 + CATALOG_SORT_OPTIONS.length) % CATALOG_SORT_OPTIONS.length;
			setActiveIndex(prev);
			itemsRef.current[prev]?.focus();
		} else if (e.key === 'Enter') {
			e.preventDefault();
			select(CATALOG_SORT_OPTIONS[idx].value);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setOpen(false);
			buttonRef.current?.focus();
		}
	}

	function select(v: CatalogSortOrderType) {
		setSortKey(v);
		setSort(v);
		setOpen(false);
		buttonRef.current?.focus();
	}

	return (
		<div ref={rootRef} className={`${styles.toolbar} ${className ?? ''}`}>
			<div className={styles.sortWrap}>
				<button
					ref={buttonRef}
					type={'button'}
					className={cn(styles.sortBtn, 'flex', 'align-center', 'flex-row', 'button-empty')}
					aria-haspopup={'listbox'}
					aria-expanded={open}
					aria-controls={listboxId}
					onClick={() => setOpen((o) => !o)}
					onKeyDown={onButtonKeyDown}
				>
					<span>{'Sort By'}</span>
					<CaretIcon className={cn(styles.caret, open ? styles.caretOpen : '')} />
				</button>

				{open && (
					<ul id={listboxId} role={'listbox'} className={styles.menu} aria-label={'Sortowanie'}>
						{CATALOG_SORT_OPTIONS.map((opt, i) => (
							<li
								key={opt.value}
								role={'option'}
								aria-selected={sortKey === opt.value}
								tabIndex={0}
								ref={(el) => {
									if (el) itemsRef.current[i] = el;
								}}
								className={`${styles.item} ${sortKey === opt.value ? styles.itemSelected : ''}`}
								onClick={() => select(opt.value)}
								onKeyDown={(e) => onItemKeyDown(e, i)}
								onMouseEnter={() => setActiveIndex(i)}
							>
								{opt.label}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

function CaretIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox={'0 0 24 24'} width={'18'} height={'18'} aria-hidden={'true'} {...props}>
			<path
				d={'M7 10l5 5 5-5'}
				stroke={'currentColor'}
				strokeWidth={'2'}
				fill={'none'}
				strokeLinecap={'round'}
				strokeLinejoin={'round'}
			/>
		</svg>
	);
}
