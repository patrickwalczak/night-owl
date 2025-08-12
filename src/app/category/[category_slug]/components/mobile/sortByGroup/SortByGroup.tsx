'use client';
import React from 'react';
import styles from './sortByGroup.module.scss';

type Props = {
	value: string;
	onChange: (next: string) => void;
	name?: string;
	legend?: string;
};

const SORT_OPTIONS: { value: string; label: string }[] = [
	{ value: 'popularity', label: 'Featured' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'price_desc', label: 'Price: High-Low' },
	{ value: 'price_asc', label: 'Price: Low-High' },
];

export default function SortByGroup({ value, onChange, name = 'sort', legend = 'Sort by' }: Props) {
	return (
		<fieldset role="radiogroup" aria-label={legend} className={styles.sortGroup}>
			<legend className={styles.sortLegend}>{legend}</legend>
			<ul className={styles.sortList}>
				{SORT_OPTIONS.map((opt) => {
					const id = `${name}-${opt.value}`;
					return (
						<li key={opt.value}>
							<label htmlFor={id} className={styles.sortLabel}>
								<input
									id={id}
									type="radio"
									name={name}
									value={opt.value}
									checked={value === opt.value}
									onChange={(e) => onChange(e.target.value)}
									className={styles.radioInput}
								/>
								<span aria-hidden className={styles.customRadio} />
								<span className={styles.labelText}>{opt.label}</span>
							</label>
						</li>
					);
				})}
			</ul>
		</fieldset>
	);
}
