import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const src = path.resolve(__dirname, '../../producer/src');
const dest = path.resolve(__dirname, '../src');

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
          ts.factory.createFunctionTypeNode(undefined, [], node.type ?? ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)),
          undefined,
        );

        if (node.body) {
          const anyArgsFunction = ts.factory.createFunctionDeclaration(
            undefined, // node.decorators,
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
            ts.factory.createFunctionTypeNode(undefined, [], ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)),
            ts.factory.createBlock(
              [
                ts.factory.createReturnStatement(
                  ts.factory.createCallExpression(ts.factory.createIdentifier('createDecorator'), undefined, [
                    ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('producer'), node.name || ''),
                    ts.factory.createIdentifier('args'),
                  ]),
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

    const utilsImportDeclaration = ts.factory.createImportDeclaration(
      undefined,
      undefined,
      ts.factory.createImportClause(false, undefined, ts.factory.createNamedImports([ts.factory.createImportSpecifier(undefined, ts.factory.createIdentifier('createDecorator'))])),
      ts.factory.createStringLiteral('./utils'),
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
