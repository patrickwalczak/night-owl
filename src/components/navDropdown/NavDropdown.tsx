import { mergeClasses } from '@/utils/mergeClasses';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styles from './navDropdown.module.scss';
import Link from 'next/link';
import { SimpleCategoryModelType } from '@/types/category.model';

const NavDropdown = ({ isExpanded, categories }: { isExpanded: boolean; categories: SimpleCategoryModelType[] }) => {
	return (
		<AnimatePresence initial={false}>
			{isExpanded && (
				<motion.nav
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					style={{ overflow: 'hidden' }}
				>
					{categories.length ? (
						<ul className={mergeClasses(styles.wrapper)}>
							{categories.map((category) => (
								<li key={category.id}>
									<Link className={mergeClasses('nav-hover-underline')} href={'/indoor-lighting'}>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<div className={styles.wrapper}>
							<p className={styles.noCategories}>No categories available</p>
						</div>
					)}
				</motion.nav>
			)}
		</AnimatePresence>
	);
};

export default NavDropdown;
