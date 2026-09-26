import { Accordion } from '@/shared/ui/accordion/Accordion';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

import { type CategoryParameter } from '../../../../category/model/categoryPage.types';
import styles from './parameterBox.module.scss';

export const ParameterBox = ({ parameter }: { parameter: CategoryParameter }) => {
    return (
        <Accordion.Root>
            <Accordion.Header headingText={parameter.name} />
            <Accordion.Panel className={styles.panel}>
                {parameter.values.map(paramValue => (
                    <Checkbox
                        classNames={{
                            label: styles.label, input: styles.input }}
                        key={paramValue.id}
                        label={paramValue.value}
                        value={paramValue.value}
                    />
                ))}
            </Accordion.Panel>
        </Accordion.Root>
    );
};
