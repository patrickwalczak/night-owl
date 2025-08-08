import { mergeClasses } from '@/utils/mergeClasses';
import { motion } from 'framer-motion';
import React from 'react';

const NavigationButton = ({
	className = '',
	children,
	handleClick = () => {},
}: {
	className?: string;
	children: React.ReactNode;
	handleClick?: () => void;
}) => {
	return (
		<motion.button
			className={mergeClasses('mobile-nav-element', 'button-empty', className, 'flex-center', 'w-100')}
			initial={{ opacity: 0, x: -30, rotate: -10 }}
			animate={{ opacity: 1, x: 0, rotate: 0 }}
			transition={{ delay: 0.2, duration: 0.4 }}
			onClick={handleClick}
		>
			{children}
		</motion.button>
	);
};

export default NavigationButton;
