import { Accordion } from '@/shared/ui/accordion/Accordion';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

import { type CategoryParameter } from '../../../../category/model/categoryPage.types';
import styles from './parameterBox.module.scss';

const checkboxClasses = { label: styles.checkboxLabel };

export const ParameterBox = ({ parameter }: { parameter: CategoryParameter }) => {
    return (
        <Accordion.Root className={styles.accordion}>
            <Accordion.Header headingText={parameter.name} className={styles.accordionHeader} />
            <Accordion.Panel className={styles.panel}>
                {parameter.values.map(paramValue => (
                    <Checkbox
                        classNames={checkboxClasses}
                        key={paramValue.id}
                        label={paramValue.value}
                        value={paramValue.value}
                    />
                ))}
            </Accordion.Panel>
        </Accordion.Root>
    );
};
