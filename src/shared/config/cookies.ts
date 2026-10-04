export type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

interface CookieDefinition {
    name: string;
    category: CookieCategory;
    description: string;
}

// Register application and third-party cookies here when adding them.
// Categories describe their purpose; consent handling is implemented separately.
export const COOKIES = {
    areFiltersOpen: {
        name: 'areFiltersOpen',
        category: 'functional',
        description: 'Remembers whether the category filters panel is open.',
    },
} as const satisfies Record<string, CookieDefinition>;
