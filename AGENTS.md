# Repository guidance

## Architectural decisions

Read and follow [the architectural decisions](docs/architecture-decisions.md) before changing code. Keep architectural rules in the ADR document rather than duplicating them here.

- [ADR 001: Responsive layouts](docs/architecture-decisions.md#001-responsive-layouts-compact-and-wide-css-and-matchmedia)
- [ADR 002: Public APIs by runtime environment](docs/architecture-decisions.md#002-public-apis-by-runtime-environment)
- [ADR 003: Category tree — two supported levels](docs/architecture-decisions.md#003-category-tree-two-supported-levels)
- [ADR 004: Feature-Sliced Design](docs/architecture-decisions.md#004-feature-sliced-design-fsd)
- [ADR 005: Component props type naming](docs/architecture-decisions.md#005-component-props-type-naming)
- [ADR 006: SCSS module naming](docs/architecture-decisions.md#006-scss-module-naming)

## Coding preferences

- Use arrow functions for components, hooks, helpers, and test utilities instead of function declarations.
- Destructure context values, for example `const { parameters } = useCategoryPageContext();`. Do not access them directly on the hook call, such as `useCategoryPageContext().parameters`.
- Use descriptive names that explain a value's role. Prefer `filterSelection` over `draft`; avoid generic names such as `source` when a more specific name would explain the purpose.

## Work context and verification

- Do not create new unit tests unless the user explicitly asks for them. Running existing tests is allowed.
- Check [the worklog](docs/worklog.md) and [the backlog](docs/backlog.md) for ongoing and planned work. During reviews, distinguish existing defects from unfinished features and work already covered by an ongoing refactor.
- Run `npm run check` after code changes. Run relevant existing tests with `npm run test:run` when behavior changes.

## Restricted data

- Do not read files containing secrets, including `.env` and `.env.*`. The exception is `.env.example`, which you may read as a configuration template.
- Do not inspect or print actual environment variable values, tokens, passwords, API keys, or connection strings.
- Do not bypass these restrictions through scripts, logs, subprocesses, or other tools.
- You may inspect variable names and configuration code without accessing their secret values.
