import { Options } from 'ts-node'

const config: Options = {
  compilerOptions: {
    target: 'es6',
    module: 'commonjs',
    lib: ['dom', 'es2016'],
    experimentalDecorators: true,
    emitDecoratorMetadata: true
  }
}

export default config
