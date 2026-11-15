# Worklog

## Category page refactor

Move data fetching close to the sections that consume it, allow independent loading, and keep only shared filter selections and UI state in context. Preserve the existing filter and pagination behavior.

- [x] Replace the category page's Redux store with local context. Migrate consumers and remove the slices, store provider, and Redux synchronization hooks.

- [X] Extract the parameter query and value-count mapping from `getCategoryPageData` into a dedicated query accepting `categoryIds`. Preserve the current parameter scope and counts.

- [ ] Pass parameters through props to the Compact and Wide filter panels and their `ParameterBox` components. Remove `parameters` from `CategoryPageContext`.

- [ ] Extract category lookup by slug from `getCategoryPageData`. Resolve the category in the page's server component, handle `notFound()` before starting section queries, and derive one shared `categoryIds` scope containing the category and its direct children.

- [ ] Pass category name, subcategories, and category slug through props to their consumers, including `ProductsInfinite`. Remove the full category object from context; retain its ID only as needed to reset filter selections on category changes.

- [ ] Introduce a server component for the filter section that owns parameter fetching. Share the fetched parameters between the Compact and Wide views without issuing duplicate queries. Keep their filter selections shared through context.

- [ ] Introduce a server component for the product listing that calls the existing `getCategoryProductsPage` and passes its result to `ProductsInfinite`. Keep the redirect for an out-of-range page with the listing logic, preserving the other URL parameters.

- [ ] Remove `productSum` from context and pass the product count to the header through props or a server-rendered slot. Share the listing's query result or count request where needed so the header does not trigger a duplicate product-list fetch or block the category name and subcategories.

- [ ] Add separate `Suspense` boundaries and suitable fallbacks for filters, products, and the product count where it loads separately. Start independent queries without awaiting all section data in the page root. Use children or slots to compose server-rendered content inside client wrappers such as `StickyHeader`.

- [ ] Finish narrowing `CategoryPageProvider` to shared filter selections and UI state, with applied URL filters and category identity used for synchronization. Delete `getCategoryPageData`, its fallback result, and aggregate types that are no longer used.

- [ ] Verify applying and clearing filters, resetting pagination, Back/Forward navigation, category changes, shared selections between Compact and Wide, and preservation of unapplied selections across pagination. Check infinite scrolling, retry and empty-result states, missing categories, and out-of-range page redirects. Run `npm run check` and relevant existing tests; do not create new unit tests unless explicitly requested.

Sorting and product search remain separate backlog tasks; this refactor should preserve their existing plumbing without implementing those features.
