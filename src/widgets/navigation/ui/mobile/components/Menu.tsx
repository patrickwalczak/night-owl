import { motion } from 'framer-motion';

import { useBodyOverflow } from '@/shared/lib/hooks/useBodyOverflow/client';
import { cn } from '@/shared/lib/utils';
import { Dialog } from '@/shared/ui/dialog/client';
import { CloseIcon } from '@/shared/ui/icons';

import styles from '../navigation.module.scss';
import { MobileNavButton } from './MobileNavButton';
import { MobileNavLink } from './MobileNavLink';

const Menu = ({ isMenuOpen, closeMenu }: { isMenuOpen: boolean; closeMenu: () => void }) => {
    useBodyOverflow(isMenuOpen);

    return (
        <Dialog id={'mobile-menu'} isOpen={isMenuOpen} onClose={closeMenu} aria-label={'Main menu'} className={styles.menuDialog}>
            {isMenuOpen && (
                <>
                    <button type={'button'} className={cn('button-empty', styles.closeMenuBtn)} onClick={closeMenu} aria-label={'Close menu'}>
                        <CloseIcon />
                    </button>
                    <motion.nav
                        onClick={(event) => {
                            if (event.target instanceof Element && event.target.closest('a[href]')) closeMenu();
                        }}
                        aria-label={'Mobile navigation'}
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
                </>
            )}
        </Dialog>
    );
};

export default Menu;
