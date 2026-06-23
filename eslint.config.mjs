import eslintPluginStylistic from '@stylistic/eslint-plugin';
import nextVitals from 'eslint-config-next/core-web-vitals';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
    /**
   * Base Next.js rules.
   *
   * This preset gives us:
   * - Next.js-specific rules
   * - React-related rules
   * - stricter checks related to performance and best practices
   *
   * It is a strong foundation for a modern Next.js app.
   */
    ...nextVitals,

    /**
   * Recommended TypeScript ESLint rules.
   *
   * These rules catch common TypeScript issues such as:
   * - unused variables
   * - unsafe patterns
   * - less maintainable constructs
   */
    ...tseslint.configs.recommended,

    /**
   * Stylistic TypeScript ESLint rules.
   *
   * These are not critical for app correctness,
   * but they help keep the codebase more consistent and readable.
   */
    ...tseslint.configs.stylistic,

    /**
   * Core React rules.
   *
   * These rules help enforce good React practices
   * and catch common issues in JSX and component code.
   */
    reactPlugin.configs.flat.recommended,

    /**
   * React JSX runtime config.
   *
   * This supports the modern JSX transform,
   * so React does not need to be imported just for JSX.
   */
    reactPlugin.configs.flat['jsx-runtime'],

    /**
   * React Hooks rules.
   *
   * These are very important because they validate:
   * - correct hook usage order
   * - dependency arrays in useEffect and related hooks
   */
    reactHooks.configs.flat.recommended,

    eslintPluginStylistic.configs.customize({
        indent: 4,
        semi: true,
        quotes: 'single',
        jsx: true,
    }),

    {
        plugins: {
            '@stylistic': eslintPluginStylistic,
            'import': importPlugin,
            perfectionist,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
                node: true,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'import/no-duplicates': 'error',
            /**
       * Warn about console usage, but allow warn and error.
       *
       * This helps prevent accidental debug logs from staying in the code,
       * while still allowing intentional warning/error logging.
       */
            'no-console': ['warn', { allow: ['warn', 'error'] }],

            /**
       * Warn when a debugger statement is left in the code.
       *
       * Useful because debugger is often forgotten after local debugging.
       */
            'no-debugger': 'warn',

            /**
       * Enforce const when a variable is never reassigned.
       *
       * This improves readability and makes intent clearer.
       */
            'prefer-const': 'error',

            /**
       * Warn about unused variables, arguments, and caught errors,
       * but ignore names starting with "_".
       *
       * This is useful when:
       * - an argument is required by a signature but intentionally unused
       * - you want to keep a placeholder for future use
       * - you intentionally ignore an error object
       */
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            /**
       * Prefer "type" imports for TypeScript-only imports.
       *
       * This makes it clearer which imports are used only for types
       * and helps keep the runtime import graph cleaner.
       */
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],

            /**
       * Disallow duplicate imports from the same module.
       *
       * Example:
       * import { a } from 'x';
       * import { b } from 'x';
       *
       * should be merged into a single import.
       */
            'import/no-duplicates': 'error',

            /**
       * Keep imports sorted in a consistent way.
       *
       * Options:
       * - natural: human-friendly sorting, e.g. item2 before item10
       * - asc: ascending order
       * - newlinesBetween: always -> separate groups with empty lines
       *
       * This improves readability and keeps imports tidy.
       */
            'perfectionist/sort-imports': [
                'warn',
                {
                    type: 'natural',
                    order: 'asc',
                    newlinesBetween: 1,
                },
            ],

            'max-len': [
                'warn',
                {
                    code: 140,
                    tabWidth: 4,
                    ignoreComments: true,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                },
            ],

            '@stylistic/indent': [
                'error',
                4,
                {
                    ArrayExpression: 1,
                    CallExpression: { arguments: 1 },
                    flatTernaryExpressions: false,
                    FunctionDeclaration: {
                        body: 1,
                        parameters: 1,
                        returnType: 1,
                    },
                    FunctionExpression: {
                        body: 1,
                        parameters: 1,
                        returnType: 1,
                    },
                    ignoreComments: false,
                    ignoredNodes: ['TSUnionType', 'TSIntersectionType'],
                    ImportDeclaration: 1,
                    MemberExpression: 1,
                    ObjectExpression: 1,
                    offsetTernaryExpressions: false,
                    outerIIFEBody: 1,
                    SwitchCase: 1,
                    tabLength: 4,
                    VariableDeclarator: 1,
                },
            ],

            '@stylistic/jsx-curly-brace-presence': [
                'error',
                {
                    props: 'always',
                    children: 'always',
                    propElementValues: 'always',
                },
            ],

            '@stylistic/quotes': [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: 'always',
                },
            ],

            '@stylistic/jsx-quotes': ['error', 'prefer-single'],

            '@stylistic/no-tabs': [
                'error',
                {
                    allowIndentationTabs: true,
                },
            ],

            '@typescript-eslint/no-empty-function': 'off',
        },
    },

    /**
   * Globally ignored files and folders.
   *
   * We ignore:
   * - .next -> generated by Next.js
   * - out / build -> build artifacts
   * - next-env.d.ts -> generated by Next.js
   * - Prisma generated client -> auto-generated code
   *
   * These files are not maintained by hand,
   * so linting them usually creates noise without value.
   */
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'src/shared/lib/db/generated/**',
    ]),
]);
