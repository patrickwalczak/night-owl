# Architectural Decisions

## 001. Responsive layouts: compact and wide, CSS and matchMedia

- Layout depends on viewport width in CSS pixels: `compact < 1024px`, `wide ≥ 1024px`. CSS and JavaScript use the same breakpoint, which can change with the visual design.
- Name variants `Compact` and `Wide`, for example `NavigationCompact`. We currently do not detect device types using `User-Agent`.
- CSS media queries control layout and visibility. Small HTML variants may be rendered together; do not duplicate the entire page or product list.
- Use `matchMedia` for behavior, effects, and mounting that depend on viewport width. Check `(min-width: 1024px)` and listen for `change` events.
- Server HTML and the initial client render must match. Read the viewport after hydration; the basic CSS layout must not wait for JavaScript.

## 002. Public APIs by runtime environment

- Each module, including each shared hook, has its own public API. Consumers import through it; internal files use direct relative imports.
- `client.ts` exports client-specific functionality and declares the client boundary with `'use client'` and `import 'client-only'`.
- `index.ts` exports environment-neutral functionality usable by both server and client code.
- `server.ts` exports server-specific functionality and uses `import 'server-only'`.
- Create only the entry points a module needs. Keep client- and server-specific exports out of neutral APIs.
