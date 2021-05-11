import * as t from '@babel/types';
import * as parser from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';

export default function runCode(source, context) {
  const output = [];
  const ____ = (value) => (output.push(JSON.stringify(value, null, 2)), value);

  const ast = parser.parse(source);

  traverse(ast, {
    ExpressionStatement(path) {
      if (path.parent.type !== 'Program') return;

      const oriExpression = path.node.expression;
      const newNode = t.expressionStatement(t.callExpression(t.identifier('____'), [oriExpression]));

      path.replaceWith(newNode);
      path.skip();
    },
  });

  const result = generate(ast);

  const ctx = Object.assign({}, context, { ____ });
  const fn = new Function('__ctx__', `with (__ctx__) { ${result.code} }`);

  try {
    fn(ctx);
  } catch (error) {
    console.error(`Error:`, error);
    console.error(`Source Code:`, result.code);
  }

  return output;
}
