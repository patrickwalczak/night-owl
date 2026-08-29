'use client';

import { cn } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

import styles from './hints.module.scss';

export type HintsLayout = 'scroll' | 'wrap';

interface HintParameter {
    label: string;
    values: string[];
}

interface HintsType {
    layout?: HintsLayout;
    className?: string;
}

const HINT_PARAMETERS: HintParameter[] = [
    {
        label: 'Color',
        values: ['Midnight purple', 'Pearl', 'Graphite'],
    },
    {
        label: 'Material',
        values: ['Cotton', 'Brushed steel'],
    },
    {
        label: 'Size',
        values: ['XS', 'Medium', 'Extra large'],
    },
    {
        label: 'Features',
        values: ['Water resistant', 'USB-C', 'Soft touch finish', 'Travel case'],
    },
];

const Hints = ({ layout = 'scroll', className }: HintsType) => {
    const layoutClassName = layout === 'scroll' ? styles.scroll : styles.wrap;

    return (
        <div className={cn(styles.container, layoutClassName, className)} aria-label={'Parameter hints'}>
            {HINT_PARAMETERS.map((parameter, parameterIndex) => (
                <div key={parameter.label} className={styles.parameter}>
                    <h3 className={styles.heading}>{parameter.label}</h3>
                    <ul className={styles.values}>
                        {parameter.values.map((value, valueIndex) => (
                            <li key={value} className={styles.value}>
                                <Checkbox
                                    id={`hint-${parameterIndex}-${valueIndex}`}
                                    label={value}
                                    name={parameter.label}
                                    value={value}
                                    classNames={{
                                        container: styles.checkbox,
                                        input: styles.checkboxInput,
                                        label: styles.checkboxLabel,
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Hints;
