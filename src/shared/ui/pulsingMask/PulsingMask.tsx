'use client';

import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';

export default function PulsingMask({
	active,
	label = 'Loading...',
	wrapClassName,
	children,
}: {
	active: boolean;
	label?: string;
	wrapClassName?: string;
	children: React.ReactNode;
}) {
	const contentRef = useCallback(
		(node: HTMLElement | null) => {
			if (node) {
				node.toggleAttribute('inert', active);
				node.setAttribute('aria-busy', String(active));
			}

			return () => {
				if (node) {
					node.toggleAttribute('inert', false);
					node.removeAttribute('aria-busy');
				}
			};
		},
		[active]
	);

	return (
		<div className={mergeClasses(styles.wrap, wrapClassName)}>
			<div ref={contentRef}>{children}</div>

			{active && (
				<div className={styles.mask} role="status" aria-live="polite" aria-label={label}>
					<span className={'sr-only'}>{label}</span>
				</div>
			)}
		</div>
	);
}
