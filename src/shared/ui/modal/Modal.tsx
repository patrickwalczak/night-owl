'use client';

import { createContext } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/utils/cn';

import { useBodyOverflow } from '../../lib/hooks/useBodyOverflow';
import { CloseIcon } from '../icons';
import styles from './modal.module.scss';
import { useHandleEscape } from './useHandleEscape';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalContext = createContext<Omit<ModalProps, 'children'> | null>(null);

const Modal = ({ open, onClose, children }: ModalProps) => {
    useBodyOverflow(open);
    useHandleEscape(open, onClose);

    if (!open) return null;

    return createPortal(
        <ModalContext.Provider value={{ open, onClose }}>{children}</ModalContext.Provider>,
        document.body,
    );
};

const Header = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
    return <div className={className}>{children}</div>;
};

const CloseButton = ({ className = '' }: { className?: string }) => {
    const { onClose } = useSafeContext(ModalContext);

    return (
        <button className={cn('button-empty', className)} onClick={onClose} aria-label={'Close modal'}>
            <CloseIcon />
        </button>
    );
};

const Overlay = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
    const { onClose } = useSafeContext(ModalContext);

    return (
        <div className={cn(styles.backdrop, className)} onClick={onClose}>
            {children}
        </div>
    );
};

import { motion, AnimatePresence, type TargetAndTransition, type Transition, type VariantLabels } from 'framer-motion';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';

interface WrapperPropsType {
    initial?: boolean | TargetAndTransition | VariantLabels;
    animate?: TargetAndTransition | VariantLabels;
    exit?: TargetAndTransition | VariantLabels;
    transition?: Transition;
    className?: string;
    children: React.ReactNode;
    id?: string;
}

const Wrapper = ({ children, className = '', id = '', initial, animate, exit, transition }: WrapperPropsType) => {
    const { onClose } = useSafeContext(ModalContext);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const element = e.target as HTMLAnchorElement;

        if (!element.closest('a[href]')) return;

        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className={cn(styles.modal, className)}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
                role={'dialog'}
                aria-modal={'true'}
                onClick={handleClick}
                id={id}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

Modal.CloseButton = CloseButton;
Modal.Overlay = Overlay;
Modal.Wrapper = Wrapper;
Modal.Header = Header;

export default Modal;
