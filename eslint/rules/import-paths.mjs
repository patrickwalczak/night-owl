import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
const sourceRoot = path.join(projectRoot, 'src');
const assetExtension = /\.(?:scss|css|sass|less|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|json|pdf|mp4|webm|mp3|wav)$/i;
const publicEntry = /^(?:(?:index|client|server)(?:\.[cm]?[jt]sx?)?)?$/;

const toSlashes = value => value.split(path.sep).join('/');

const getModule = (filename) => {
    const relative = toSlashes(path.relative(projectRoot, filename));
    // Root Next.js routes and src/app share one application composition scope.
    if (/^(?:src\/)?app(?:\/|$)/.test(relative)) return 'app';

    const [root, layer, segment, moduleName, hook] = relative.split('/');
    if (root !== 'src') return null;
    if (['pages', 'widgets', 'features', 'entities'].includes(layer) && segment) return `${layer}/${segment}`;
    if (layer !== 'shared' || !segment) return null;
    if (segment === 'lib' && moduleName === 'hooks' && hook) return `shared/lib/hooks/${hook}`;
    if (['lib', 'ui'].includes(segment) && moduleName) return `shared/${segment}/${moduleName}`;
    return `shared/${segment}`;
};

export const importPaths = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Use relative imports within modules and aliases through public APIs between modules.',
        },
        fixable: 'code',
        schema: [],
        messages: {
            relative: 'Use a relative path within the same module: "{{expected}}".',
            absolute: 'Use an alias between modules: "{{expected}}".',
            publicApi: 'Import from the public API of "{{module}}" (index, client, or server), not its internal files.',
        },
    },

    create: (context) => {
        const filename = context.physicalFilename;
        const currentModule = getModule(filename);
        if (!currentModule) return {};

        const checkImport = (node) => {
            if (!node || typeof node.value !== 'string') return;

            const importPath = node.value;
            const suffixIndex = importPath.search(/[?#]/);
            const specifier = suffixIndex === -1 ? importPath : importPath.slice(0, suffixIndex);
            const suffix = suffixIndex === -1 ? '' : importPath.slice(suffixIndex);
            const isAlias = specifier.startsWith('@/');
            const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
            if (!isAlias && !isRelative) return;

            const target = isAlias
                ? path.resolve(sourceRoot, specifier.slice(2))
                : path.resolve(path.dirname(filename), specifier);
            const targetModule = getModule(target);
            if (!targetModule) return;

            const sameModule = currentModule === targetModule;
            const targetPath = toSlashes(path.relative(sourceRoot, target));
            const entry = targetPath.slice(targetModule.length).replace(/^\//, '');
            if (!sameModule && !assetExtension.test(specifier) && !publicEntry.test(entry)) {
                context.report({
                    node,
                    messageId: 'publicApi',
                    data: { module: `@/${targetModule}` },
                });
                return;
            }

            let expected;
            if (sameModule) {
                expected = toSlashes(path.relative(path.dirname(filename), target));
                if (!expected.startsWith('.')) expected = `./${expected}`;
            }
            else {
                expected = `@/${targetPath}`;
            }
            expected += suffix;
            if (expected === importPath) return;

            context.report({
                node,
                messageId: sameModule ? 'relative' : 'absolute',
                data: { expected },
                fix: fixer => fixer.replaceText(node, JSON.stringify(expected)),
            });
        };

        return {
            ImportDeclaration: node => checkImport(node.source),
            ExportNamedDeclaration: node => checkImport(node.source),
            ExportAllDeclaration: node => checkImport(node.source),
            ImportExpression: node => checkImport(node.source),
            TSImportType: node => checkImport(node.source),
            TSExternalModuleReference: node => checkImport(node.expression),
        };
    },
};
