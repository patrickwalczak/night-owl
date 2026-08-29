import { motion } from 'framer-motion';

import { cn } from '@/shared/lib/utils';
import Modal from '@/shared/ui/modal/client';

import styles from '../navigation.module.scss';
import { MobileNavButton } from './MobileNavButton';
import { MobileNavLink } from './MobileNavLink';

const Menu = ({ isMenuOpen, closeMenu }: { isMenuOpen: boolean; closeMenu: () => void }) => {
    return (
        <Modal open={isMenuOpen} onClose={closeMenu}>
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
                    <motion.nav
                        className={cn(styles.contentWrapper, 'flex', 'flex-col', 'align-center')}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                        initial={'hidden'}
                        animate={'visible'}
                    >
                        <MobileNavLink hasBorderBottom href={'/'}>
                            {'Home'}
                        </MobileNavLink>

                        <MobileNavButton hasBorderBottom>
                            {'Categories'}
                        </MobileNavButton>
                    </motion.nav>
                </Modal.Wrapper>
            </Modal.Overlay>
        </Modal>
    );
};

export default Menu;
