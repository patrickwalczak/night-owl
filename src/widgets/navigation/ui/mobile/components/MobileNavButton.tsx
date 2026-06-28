import { motion, type HTMLMotionProps } from 'framer-motion';
import { type PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import styles from './mobileNavElement.module.scss';

type MobileNavButtonType = PropsWithChildren<HTMLMotionProps<'button'>> & {
    hasBorderBottom?: boolean;
};

export const MobileNavButton = ({
    className,
    children,
    type = 'button',
    hasBorderBottom = false,
    ...props
}: MobileNavButtonType) => {
    return (
        <motion.button
            className={cn(
                styles.element,
                styles.button,
                hasBorderBottom && styles.borderBottom,
                className,
            )}
            type={type}
            initial={{ opacity: 0, x: -30, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};
