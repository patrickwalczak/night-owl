import { mergeClasses } from '@/utils/mergeClasses';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styles from './categoriesDropdown.module.scss';
import Link from 'next/link';
import { SimpleCategoryModelType } from '@/types/category.model';

const CategoriesDropdown = ({
	isExpanded,
	categories,
	controllerBtnRef,
}: {
	isExpanded: boolean;
	categories: SimpleCategoryModelType[];
	controllerBtnRef?: React.RefObject<HTMLButtonElement | null>;
}) => {
	const refCallback = (node: HTMLDivElement) => {
		if (node) node.querySelector('a')?.focus();

		return () => {
			controllerBtnRef?.current?.focus();
		};
	};

	return (
		<AnimatePresence initial={false}>
			{isExpanded && (
				<motion.nav
					ref={refCallback}
					id="catalog-dropdown"
					aria-labelledby="catalog-button"
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className={styles.dropdown}
				>
					{categories.length ? (
						<ul className={mergeClasses(styles.wrapper)}>
							{categories.map((category) => (
								<Category key={category.id} category={category} />
							))}
						</ul>
					) : (
						<NoCategoriesMessage />
					)}
				</motion.nav>
			)}
		</AnimatePresence>
	);
};

export default CategoriesDropdown;

const Category = ({ category }: { category: SimpleCategoryModelType }) => (
	<li key={category.id}>
		<Link className={mergeClasses('nav-hover-underline')} href={`/category/${category.slug}`}>
			{category.name}
		</Link>
	</li>
);

const NoCategoriesMessage = () => <p className={styles.noCategories}>No categories available</p>;
