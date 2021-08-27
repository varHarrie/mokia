import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const srcRoot = path.resolve(__dirname, '../../producer/src');
const destRoot = path.resolve(__dirname, '../src');

const entries = ['', 'zhCN'];

entries.forEach((dir) => generate(dir));

function generate(dir: string) {
  const src = path.join(srcRoot, dir);
  const dest = path.join(destRoot, dir);

  const program = ts.createProgram([path.join(src, 'index.ts')], { module: ts.ModuleKind.ESNext });
  const printer = ts.createPrinter();

  if (!fs.existsSync(dest)) fs.mkdirSync(dest);

  const indexFile = program.getSourceFile(path.join(src, 'index.ts'));
  if (!indexFile) throw new Error('Missing index.ts');
  const producerFiles = getProducerFiles(indexFile);

  producerFiles.forEach((file) => {
    const result = ts.transform(file, [decoratorTransformer, importTransformer]);
    fs.writeFileSync(path.join(dest, path.basename(file.fileName)), printer.printFile(result.transformed[0] as ts.SourceFile));
  });

  function getProducerFiles(entryFile: ts.SourceFile) {
    const files: ts.SourceFile[] = [];

    function visitor(node: ts.Node) {
      if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const fileName = node.moduleSpecifier.text;
        const file = program.getSourceFile(path.join(src, `${fileName}.ts`));
        if (file) files.push(file);
      }

      node.forEachChild(visitor);
    }

    visitor(entryFile);

    return files;
  }
}

function decoratorTransformer(context: ts.TransformationContext) {
  return (sourceFile: ts.SourceFile) => {
    const visitor: ts.Visitor = (node) => {
      if (isExportFunction(node)) {
        const emptyBodyFunction = ts.factory.createFunctionDeclaration(
          node.decorators,
          node.modifiers,
          node.asteriskToken,
          node.name,
          node.typeParameters,
          node.parameters,
          ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Decorator'), undefined),
          undefined,
        );

        if (node.body) {
          const dirName = path.relative(srcRoot, path.dirname(sourceFile.fileName));

          const propertyAccess = dirName
            ? ts.factory.createPropertyAccessExpression(ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('producer'), dirName), node.name!)
            : ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('producer'), node.name!);

          const anyArgsFunction = ts.factory.createFunctionDeclaration(
            undefined,
            node.modifiers,
            node.asteriskToken,
            node.name,
            [],
            [
              ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                ts.factory.createToken(ts.SyntaxKind.DotDotDotToken),
                ts.factory.createIdentifier('args'),
                undefined,
                ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)),
                undefined,
              ),
            ],
            ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('Decorator'), undefined),
            ts.factory.createBlock(
              [
                ts.factory.createReturnStatement(
                  ts.factory.createCallExpression(ts.factory.createIdentifier('createDecorator'), undefined, [propertyAccess, ts.factory.createIdentifier('args')]),
                ),
              ],
              true,
            ),
          );

          return [emptyBodyFunction, anyArgsFunction];
        }

        return emptyBodyFunction;
      }

      if (ts.isImportDeclaration(node)) return node;

      if (ts.isTypeAliasDeclaration(node)) {
        const hasExportKeyword = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExportKeyword) return node;
      }

      return undefined;
    };

    return ts.visitNode(sourceFile, (node) => ts.visitEachChild(node, visitor, context));
  };
}

function importTransformer(context: ts.TransformationContext) {
  return (sourceFile: ts.SourceFile) => {
    const producersImportDeclaration = ts.factory.createImportDeclaration(
      undefined,
      undefined,
      ts.factory.createImportClause(false, undefined, ts.factory.createNamespaceImport(ts.factory.createIdentifier('producer'))),
      ts.factory.createStringLiteral('@mokia/producer'),
    );

    const relativePath = getRelativePath(path.dirname(sourceFile.fileName), path.join(srcRoot, 'utils'));

    const utilsImportDeclaration = ts.factory.createImportDeclaration(
      undefined,
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(undefined, ts.factory.createIdentifier('createDecorator')),
          ts.factory.createImportSpecifier(undefined, ts.factory.createIdentifier('Decorator')),
        ]),
      ),
      ts.factory.createStringLiteral(relativePath),
    );

    const visitor = (node: ts.Node): ts.Node | undefined => {
      if (ts.isImportDeclaration(node)) return isTypesImport(node) ? node : undefined;
      return ts.visitEachChild(node, visitor, context);
    };

    return ts.factory.updateSourceFile(sourceFile, [producersImportDeclaration, utilsImportDeclaration, ...ts.visitNode(sourceFile, visitor).statements]);
  };
}

function isExportFunction(node: ts.Node): node is ts.FunctionDeclaration {
  let result = false;

  if (node.kind === ts.SyntaxKind.FunctionDeclaration) {
    node.forEachChild((n) => {
      if (n.kind === ts.SyntaxKind.ExportKeyword) {
        result = true;
      }
    });
  }

  return result;
}

function isTypesImport(node: ts.ImportDeclaration): boolean {
  return ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text === './types';
}

function getRelativePath(from: string, to: string): string {
  const p = path.relative(from, to);
  return p.startsWith('..') ? p : `./${p}`;
}
