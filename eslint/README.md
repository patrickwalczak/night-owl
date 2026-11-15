# Local ESLint rules

`local/import-paths` enforces the import convention from ADR 002 and ADR 004:

- Within a slice or shared module, use relative paths.
- Between modules, use the `@/` alias and the target module's `index`, `client`, or `server` public API.
- Imports of styles and other static assets can reference files directly across module boundaries; they still use the alias.

Run `npm run lint:fix` to fix path notation. Imports bypassing another module's public API are reported without an automatic fix: choosing the correct runtime entry point requires reviewing its exports.

The rule checks imports, re-exports, literal dynamic imports, and TypeScript import types.

Module boundaries are explicit in `getModule`; the rule does not inspect files on disk:

- `pages/<slice>`, `widgets/<slice>`, `features/<slice>`, `entities/<slice>`.
- `shared/ui/<module>` and `shared/lib/<module>`.
- `shared/lib/hooks/<hook>` for individual hooks.
- Other shared segments as a whole, for example `shared/config` and `shared/styles`.

Update `getModule` if the repository adopts a different module structure. The rule checks public API path names, not whether the entry point exists or exports a requested symbol.

The root Next.js `app/` and `src/app/` share one application composition scope. Generated Prisma files remain excluded by the existing ESLint configuration. The rule does not enforce layer dependency direction.
