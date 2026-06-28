type ClassParameters = string | false | null | undefined | Record<string, boolean | null | undefined>;

export function cn(...classes: ClassParameters[]) {
    return classes
        .flatMap((className) => {
            if (!className) {
                return [];
            }

            if (typeof className === 'string') {
                return className;
            }

            return Object.entries(className)
                .filter(([, condition]) => Boolean(condition))
                .map(([className]) => className);
        })
        .join(' ');
}
