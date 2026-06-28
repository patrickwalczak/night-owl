'use client';

import useOpenState from '@/shared/lib/hooks/useIsOpenState';
import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils/cn';
import { NavigationContext } from '@/widgets/navigation/ui/Navigation';

import { HamburgerIcon } from '../../../../shared/ui/icons';
import Menu from './components/Menu';
import styles from './navigation.module.scss';

const MobileNavigation = () => {
    const { isScrolled, hideDropdown } = useSafeContext(NavigationContext);
    const { isOpened: isMenuOpened, close: closeMenu, open: openMenu } = useOpenState();

    const handleCloseMenu = () => {
        closeMenu();
        hideDropdown();
    };

    return (
        <>
            <Menu isMenuOpened={isMenuOpened} closeMenu={handleCloseMenu} />
            <button
                type={'button'}
                aria-label={'Open menu'}
                aria-expanded={isMenuOpened}
                aria-controls={'mobile-menu'}
                aria-haspopup={'true'}
                className={cn(
                    styles.button,
                    'button-empty',
                    styles.hamburgerBtn,
                    { [styles.isScrolled]: isScrolled },
                    'transition-200',
                )}
                onClick={openMenu}
            >
                <HamburgerIcon />
            </button>
        </>
    );
};

export default MobileNavigation;
