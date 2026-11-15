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

## 003. Category tree: two supported levels

- The application currently supports exactly two category levels: level 1 contains root categories, and level 2 contains their direct children (subcategories).
- Root categories have no parent. Each subcategory belongs to one root category; deeper nesting is not currently supported by the application.
- Category navigation and product/filter listings follow this two-level structure. A root category's listing includes the root category and its direct children; a subcategory's listing includes only that subcategory.
- Supporting deeper nesting or multiple parents requires a separate architectural decision; the possible extension is tracked in the backlog.

## 004. Feature-Sliced Design (FSD)

- The repository uses [Feature-Sliced Design (FSD)](https://feature-sliced.design/) to organize application code by responsibility and business scope.
- Layers are ordered from highest to lowest: `app`, `pages`, `widgets`, `features`, `entities`, and `shared`. Dependencies flow from higher layers to lower layers.
- `pages`, `widgets`, `features`, and `entities` contain independent slices grouped by business purpose. Slices on the same layer do not import from each other. `app` and `shared` contain segments directly, without slices.
- Segments such as `ui`, `api`, `model`, `lib`, and `config` separate code by technical responsibility. Organize their internals as needed without repeating these segment names in nested folders.
- Use relative imports within a module or slice, and absolute imports through public APIs between modules or layers. Runtime-specific public APIs follow decision 002.
- The root `app/` directory contains Next.js routing entry points; application composition and providers live in `src/app/`, with the remaining FSD layers under `src/`.

## 005. Component props type naming

- Name component props types by appending `Type` to the component name, for example `CategoryTileType` for `CategoryTile`.
- Apply this convention whether the props are declared using a `type` alias or an `interface`.

## 006. SCSS module naming

- Name component SCSS modules using the component name with a lowercase first letter, followed by `.module.scss`, for example `categoryTile.module.scss` for `CategoryTile`.
