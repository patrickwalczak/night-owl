import { type Ref, type RefCallback } from 'react';

type PossibleRefType<T> = Ref<T> | undefined;

export const mergeRefs = <T>(...refs: PossibleRefType<T>[]): RefCallback<T> => {
    return (node) => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(node);
                return;
            }

            ref.current = node;
        });
    };
};
