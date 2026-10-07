'use client';

import { useId, useState } from 'react';

import { DialogDrawerMotion, DialogDrawerTransition, DialogTriggerButton } from '@/shared/ui/dialog/client';
import { CloseIcon } from '@/shared/ui/icons';

import styles from './drawerPreview.module.scss';

export const DrawerPreview = () => {
    const id = useId();
    const [variant, setVariant] = useState<'motion' | 'transition' | null>(null);
    const [side, setSide] = useState<'left' | 'right'>('right');
    const close = () => setVariant(null);

    const content = (titleId: string) => (
        <div className={styles.content}>
            <header className={styles.header}>
                <h2 id={titleId}>{'Your evening essentials'}</h2>
                <button type={'button'} className={styles.close} aria-label={'Close drawer'} onClick={close}>
                    <CloseIcon />
                </button>
            </header>
            <p>{'A little light makes all the difference. Explore a few ideas for a quieter evening.'}</p>
            <ul className={styles.items}>
                <li>
                    <strong>{'Warm lighting'}</strong>
                    <span>{'A softer glow for winding down.'}</span>
                </li>
                <li>
                    <strong>{'Reading corner'}</strong>
                    <span>{'Keep your favorite book within reach.'}</span>
                </li>
                <li>
                    <strong>{'Outdoor evenings'}</strong>
                    <span>{'Bring a little warmth to the terrace.'}</span>
                </li>
            </ul>
            <label className={styles.note}>
                {'Try typing here to check keyboard focus'}
                <input placeholder={'Your evening plans'} />
            </label>
            <button type={'button'} className={styles.button} onClick={close}>{'Done'}</button>
        </div>
    );

    return (
        <section className={styles.preview} aria-labelledby={`${id}-preview-title`}>
            <div>
                <h2 id={`${id}-preview-title`}>{'Drawer preview'}</h2>
                <p>{'Compare both animations. Close with Escape, the backdrop, or the close button.'}</p>
            </div>
            <div className={styles.controls}>
                <label className={styles.side}>
                    {'Slide from'}
                    <select value={side} onChange={event => setSide(event.target.value as 'left' | 'right')}>
                        <option value={'right'}>{'Right'}</option>
                        <option value={'left'}>{'Left'}</option>
                    </select>
                </label>
                <DialogTriggerButton
                    className={styles.button}
                    dialogId={`${id}-motion`}
                    isDialogOpen={variant === 'motion'}
                    onClick={() => setVariant('motion')}
                >
                    {'Open Motion'}
                </DialogTriggerButton>
                <DialogTriggerButton
                    className={styles.button}
                    dialogId={`${id}-transition`}
                    isDialogOpen={variant === 'transition'}
                    onClick={() => setVariant('transition')}
                >
                    {'Open ViewTransition'}
                </DialogTriggerButton>
            </div>
            <DialogDrawerMotion
                id={`${id}-motion`}
                aria-labelledby={`${id}-motion-title`}
                isOpen={variant === 'motion'}
                onClose={close}
                side={side}
            >
                {content(`${id}-motion-title`)}
            </DialogDrawerMotion>
            <DialogDrawerTransition
                id={`${id}-transition`}
                aria-labelledby={`${id}-transition-title`}
                isOpen={variant === 'transition'}
                onClose={close}
                side={side}
            >
                {content(`${id}-transition-title`)}
            </DialogDrawerTransition>
        </section>
    );
};
