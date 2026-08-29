import { cn } from '@/shared/lib/utils';

import styles from './scssPreview.module.scss';

const SEMANTIC_BACKGROUND_TOKENS = [
    {
        name: '--color-background-primary',
        title: 'Primary',
        className: styles.backgroundPrimary,
        textClassName: styles.textPrimary,
    },
    {
        name: '--color-background-secondary',
        title: 'Secondary',
        className: styles.backgroundSecondary,
        textClassName: styles.textPrimary,
    },
    {
        name: '--color-background-inverted',
        title: 'Inverted',
        className: styles.backgroundInverted,
        textClassName: styles.textInverted,
    },
    {
        name: '--color-background-accent',
        title: 'Accent',
        className: styles.backgroundAccent,
        textClassName: styles.textInverted,
    },
] as const;

const SEMANTIC_TEXT_TOKENS = [
    {
        name: '--color-text-primary',
        title: 'Primary text',
        className: styles.textPrimary,
        surfaceClassName: styles.backgroundSecondary,
        metaClassName: styles.textMuted,
    },
    {
        name: '--color-text-secondary',
        title: 'Secondary text',
        className: styles.textSecondary,
        surfaceClassName: styles.backgroundSecondary,
        metaClassName: styles.textMuted,
    },
    {
        name: '--color-text-muted',
        title: 'Muted text',
        className: styles.textMuted,
        surfaceClassName: styles.backgroundSecondary,
        metaClassName: styles.textMuted,
    },
    {
        name: '--color-text-inverted',
        title: 'Inverted text',
        className: styles.textInverted,
        surfaceClassName: styles.backgroundInverted,
        metaClassName: styles.textInverted,
    },
    {
        name: '--color-text-accent',
        title: 'Accent text',
        className: styles.textAccent,
        surfaceClassName: styles.backgroundSecondary,
        metaClassName: styles.textMuted,
    },
] as const;

const RAW_COLOR_TOKENS = [
    { name: '--color-owl-white', className: styles.owlWhite },
    { name: '--color-owl-gray-200', className: styles.owlGray200 },
    { name: '--color-owl-gray-300', className: styles.owlGray300 },
    { name: '--color-owl-gray-400', className: styles.owlGray400 },
    { name: '--color-owl-gray-425', className: styles.owlGray425 },
    { name: '--color-owl-gray-450', className: styles.owlGray450 },
    { name: '--color-owl-gray-500', className: styles.owlGray500 },
    { name: '--color-owl-gray-600', className: styles.owlGray600 },
    { name: '--color-owl-blue-100', className: styles.owlBlue100 },
    { name: '--color-owl-blue-500', className: styles.owlBlue500 },
    { name: '--color-owl-blue-800', className: styles.owlBlue800 },
    { name: '--color-owl-purple-200', className: styles.owlPurple200 },
    { name: '--color-owl-purple-500', className: styles.owlPurple500 },
    { name: '--color-owl-purple-850', className: styles.owlPurple850 },
] as const;

const TYPOGRAPHY_SAMPLES = [
    { label: '.h1', className: 'h1', text: 'Night Owl' },
    { label: '.h2', className: 'h2', text: 'Outdoor Lighting' },
    { label: '.h3', className: 'h3', text: 'Indoor Lighting' },
    { label: '.h4', className: 'h4', text: 'Accessories' },
    { label: '.p', className: 'p', text: 'Soft, readable body copy for product descriptions and editorial blocks.' },
    { label: '.text-sm', className: 'text-sm', text: 'Compact UI text' },
] as const;

export const ScssPreview = () => {
    return (
        <section className={styles.section} aria-labelledby={'scss-preview-title'}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>{'Design tokens'}</p>
                    <h2 id={'scss-preview-title'} className={cn(styles.title, 'h3', 'font-playfair')}>
                        {'SCSS preview'}
                    </h2>
                    <p className={cn(styles.description, 'p')}>
                        {'Semantic colors, raw palette, and typography rhythm in one place.'}
                    </p>
                </header>

                <div className={styles.group}>
                    <h3 className={styles.groupTitle}>{'Semantic backgrounds'}</h3>
                    <div className={styles.surfaceGrid}>
                        {SEMANTIC_BACKGROUND_TOKENS.map(token => (
                            <article key={token.name} className={cn(styles.surfaceSample, token.className, token.textClassName)}>
                                <span className={styles.tokenName}>{token.name}</span>
                                <div className={styles.surfaceContent}>
                                    <strong>{token.title}</strong>
                                    <span>{'Surface sample with matching readable text.'}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className={styles.group}>
                    <h3 className={styles.groupTitle}>{'Semantic text colors'}</h3>
                    <div className={styles.textGrid}>
                        {SEMANTIC_TEXT_TOKENS.map(token => (
                            <article key={token.name} className={cn(styles.textSample, token.surfaceClassName)}>
                                <span className={cn(styles.tokenName, token.metaClassName)}>{token.name}</span>
                                <strong className={cn(styles.textSampleTitle, token.className)}>{token.title}</strong>
                                <p className={cn(styles.textSampleCopy, token.className)}>
                                    {'The quick brown fox checks contrast, weight, and warmth.'}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className={styles.group}>
                    <h3 className={styles.groupTitle}>{'Raw color palette'}</h3>
                    <div className={styles.paletteGrid}>
                        {RAW_COLOR_TOKENS.map(token => (
                            <div key={token.name} className={styles.paletteItem}>
                                <span className={cn(styles.paletteColor, token.className)} />
                                <span className={styles.paletteName}>{token.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.group}>
                    <h3 className={styles.groupTitle}>{'Typography scale'}</h3>
                    <div className={styles.typographyList}>
                        {TYPOGRAPHY_SAMPLES.map(sample => (
                            <article key={sample.label} className={styles.typographyItem}>
                                <span className={styles.tokenName}>{sample.label}</span>
                                <span className={cn(styles.typographyText, sample.className)}>{sample.text}</span>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
