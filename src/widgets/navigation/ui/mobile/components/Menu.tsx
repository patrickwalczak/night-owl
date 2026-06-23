import { motion } from 'framer-motion';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils/cn';

import Modal from '../../../../../shared/ui/modal/Modal';
import styles from '../navigation.module.scss';
import NavigationButton from './NavigationButton';

const Menu = ({ isMenuOpened, closeMenu }: { isMenuOpened: boolean; closeMenu: () => void }) => {
    return (
        <Modal open={isMenuOpened} onClose={closeMenu}>
            <Modal.Overlay>
                <Modal.Wrapper
                    id={'mobile-menu'}
                    className={styles.modal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                >
                    <Modal.CloseButton className={styles.closeModalBtn} />
                    <motion.div
                        className={cn(styles.contentWrapper, 'flex', 'flex-col', 'align-center')}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                        initial={'hidden'}
                        animate={'visible'}
                    >
                        <HomeLink />
                        <NavigationButton className={'mobile-nav-element--border-bottom'}>
                            {'Catalog'}
                        </NavigationButton>
                    </motion.div>
                </Modal.Wrapper>
            </Modal.Overlay>
        </Modal>
    );
};

export default Menu;

const HomeLink = () => (
    <motion.div
        className={cn(styles.linkWrapper, 'block', 'w-100')}
        variants={{
            hidden: { opacity: 0, rotate: -10, x: -20, y: -10 },
            visible: { opacity: 1, rotate: 0, x: 0, y: 0 },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
    >
        <Link className={cn('mobile-nav-element', 'block', 'w-100')} href={'/'}>
            {'Home'}
        </Link>
    </motion.div>
);
