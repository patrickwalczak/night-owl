import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

const NavigationButton = ({
	className = '',
	children,
	handleClick = () => {},
}: {
	className?: string;
	children: ReactNode;
	handleClick?: () => void;
}) => {
	return (
		<motion.button
			className={cn('button-empty', 'mobile-nav-element', className, 'flex-center', 'w-100')}
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
