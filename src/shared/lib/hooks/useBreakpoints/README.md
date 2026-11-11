# useBreakpoints

```tsx
import { useBreakpoints } from '@/shared/lib/hooks/useBreakpoints/client';

const { isCompact, isWide, atLeast } = useBreakpoints();
// atLeast[768] means viewport width >= 768 CSS pixels.
```

All matches are `null` during SSR and initial hydration. Use `isWide === true` or `isCompact === true` when mounting layout-specific content; `!isWide` would also match the unknown state. CSS controls the basic layout.

Consumers share one `matchMedia` listener per breakpoint. Listeners are removed when the last consumer unmounts. The snapshot changes only when a threshold is crossed.

`shared/config/breakpoints.ts` defines the numeric thresholds and `WIDE_BREAKPOINT`. The store uses these values directly. Keep them consistent with `shared/styles/_breakpoints.scss`; there is no automatic synchronization or runtime CSS lookup.
