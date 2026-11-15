# Worklog

## Category page refactor

Move data fetching close to the sections that consume it, allow independent loading, and keep only shared filter selections and UI state in context. Preserve the existing filter and pagination behavior.

- [x] Replace the category page's Redux store with local context. Migrate consumers and remove the slices, store provider, and Redux synchronization hooks.

- [x] Extract the parameter query and value-count mapping from `getCategoryPageData` into `getCategoryParameters`, accepting `categoryIds` and preserving the current parameter scope and counts.

- [x] Remove `parameters` from `CategoryPageContext`. Pass parameters through props to the Wide panel and `ParameterBox`; compose server-rendered parameter boxes as children of the Compact drawer.

- [x] Extract category lookup into `getCategoryWithChildrenBySlug`, map children's product counts, and expose `getCachedCategoryWithChildrenBySlug` for request-scoped deduplication. Reuse it in `CategoryPage` and section queries; keep the listing scope limited to the category and its direct children.

- [ ] Pass category name and subcategories through props or server-rendered slots to their remaining consumers. `ProductsInfinite` already receives the category slug through props. Remove the full category object from context; retain its ID only as needed to reset filter selections on category changes.

- [x] Introduce server components for the Wide filter panel and Compact parameter list. Share parameter fetching through `getCachedCategoryParametersBySlug`, keeping filter selections in context and using separate Suspense fallbacks for both views.

- [x] Add `SideFiltersDesktopSkeleton` and reuse `FilterParametersSkeleton` in both layouts. Keep the Compact fallback inside the drawer so the trigger and drawer controls remain available while parameters load. Parameters are fetched during the server render; the skeleton is visible only if the drawer opens before the data is ready.

- [x] Add `app/category/[category_slug]/loading.tsx`, rendering `CategoryPageSkeleton` through the category slice's public API. Remove the page's manual outer Suspense boundary and merge `CategoryPageContent` into the async `CategoryPage`.

- [x] Introduce `CategoryProductsServer`, fetching products through `getCachedCategoryProductsPageBySlug`. Resolve the category through the cached query, handle missing categories before querying products, and pass the result and category slug to `ProductsInfinite`. Keep the out-of-range page redirect in the listing, preserving the other URL parameters.

- [x] Remove `productSum` from context. Render `CategoryProductCountServer` through a slot in the sticky header and reuse the listing's cached result for the same category slug and serialized search parameters. Show the category name immediately while the count loads, without a duplicate product-list query.

- [x] Add independent `Suspense` boundaries for products and the product count. Reuse `ProductsSkeleton` in both the listing fallback and `CategoryPageSkeleton`; use a null fallback for the count. `CategoryPage` now waits only for route inputs, category lookup, and the filter-panel cookie. Product and filter queries run in their server sections, with count content composed through client header wrappers.

- [x] Delete `getCategoryPageData`, its fallback result, and the unused aggregate types and options.

- [ ] Finish narrowing `CategoryPageProvider` to shared filter selections and UI state, with applied URL filters and category identity used for synchronization. The full category object remains in context for the category name and subcategories; parameters and the product count have already been removed.

- [ ] Verify applying and clearing filters, resetting pagination, Back/Forward navigation, category changes, shared selections between Compact and Wide, and preservation of unapplied selections across pagination. Check infinite scrolling, retry and empty-result states, missing categories, and out-of-range page redirects. Run `npm run check` and relevant existing tests; do not create new unit tests unless explicitly requested.

Sorting and product search remain separate backlog tasks; this refactor should preserve their existing plumbing without implementing those features.

Last code verification: `npm run check` passed, all 55 existing tests passed, and the product and page skeleton SCSS modules compiled. Existing tests were updated for the context without `parameters` and `productSum`; manual verification of the full navigation, filtering, loading, and infinite-scroll flows remains part of the unfinished verification step above.
