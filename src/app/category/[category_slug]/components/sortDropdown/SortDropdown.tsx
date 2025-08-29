'use client';

import React, { useId, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { DEFAULT_SORT_ORDER, SORT_OPTIONS, SORT_ORDER_OPTIONS } from '@/constants';
import { SortOrderKeys } from '@/types/catalog.models';
import { mergeClasses } from '@/utils/mergeClasses';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSafeContext } from '@/hooks/useSafeContext';
import { CatalogUrlActionsContext } from '../../providers/CatalogUrlActionsProvider';

export default function SortDropdown({ className }: { className?: string }) {
	const { searchParams, setSort } = useSafeContext(CatalogUrlActionsContext);

	const initialSort = () => {
		const sortParam = searchParams.get('sort') as SortOrderKeys;

		if (sortParam && SORT_ORDER_OPTIONS.includes(sortParam)) {
			return sortParam;
		}

		return DEFAULT_SORT_ORDER;
	};

	const [open, setOpen] = useState(false);
	const [sortKey, setSortKey] = useState<SortOrderKeys>(() => initialSort());
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
					SORT_OPTIONS.findIndex((o) => o.value === sortKey)
				)
			);
			requestAnimationFrame(() => itemsRef.current[activeIndex]?.focus());
		}
	}

	function onItemKeyDown(e: React.KeyboardEvent, idx: number) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const next = (idx + 1) % SORT_OPTIONS.length;
			setActiveIndex(next);
			itemsRef.current[next]?.focus();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			const prev = (idx - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length;
			setActiveIndex(prev);
			itemsRef.current[prev]?.focus();
		} else if (e.key === 'Enter') {
			e.preventDefault();
			select(SORT_OPTIONS[idx].value);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setOpen(false);
			buttonRef.current?.focus();
		}
	}

	function select(v: SortOrderKeys) {
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
					type="button"
					className={mergeClasses(styles.sortBtn, 'flex', 'align-center', 'flex-row', 'button-empty')}
					aria-haspopup="listbox"
					aria-expanded={open}
					aria-controls={listboxId}
					onClick={() => setOpen((o) => !o)}
					onKeyDown={onButtonKeyDown}
				>
					<span>Sort By</span>
					<CaretIcon className={mergeClasses(styles.caret, open ? styles.caretOpen : '')} />
				</button>

				{open && (
					<ul id={listboxId} role="listbox" className={styles.menu} aria-label="Sortowanie">
						{SORT_OPTIONS.map((opt, i) => (
							<li
								key={opt.value}
								role="option"
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
		<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
			<path
				d="M7 10l5 5 5-5"
				stroke="currentColor"
				strokeWidth="2"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
