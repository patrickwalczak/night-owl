'use client';

import { motion } from 'framer-motion';
import Link, { type LinkProps } from 'next/link';
import { type ComponentPropsWithRef, type PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import styles from './mobileNavElement.module.scss';

type MobileNavLinkType = PropsWithChildren<
    LinkProps & Omit<ComponentPropsWithRef<'a'>, keyof LinkProps>
> & {
    hasBorderBottom?: boolean;
};

export const MobileNavLink = ({
    className,
    children,
    hasBorderBottom = false,
    ...props
}: MobileNavLinkType) => {
    return (
        <motion.div
            className={'w-100'}
            variants={{
                hidden: { opacity: 0, rotate: -10, x: -20, y: -10 },
                visible: { opacity: 1, rotate: 0, x: 0, y: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <Link
                className={cn(
                    styles.element,
                    styles.link,
                    hasBorderBottom && styles.borderBottom,
                    className,
                )}
                {...props}
            >
                {children}
            </Link>
        </motion.div>
    );
};
