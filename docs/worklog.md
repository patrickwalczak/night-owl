# Worklog

- [ ] Refactor the category page: split `getCategoryPageData` into smaller queries, move data fetching and rendering as close as possible to the components that need the data, and use separate `Suspense` boundaries where sections can load independently. Remove the category page's Redux store; pass server data through props and keep shared draft filters and UI state in local state or context. Preserve filter application through the URL and product infinite scrolling.
