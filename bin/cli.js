#!/usr/bin/env node
'use strict';

const options = {
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": ["dom", "es2016", "es2017"],
    "strictPropertyInitialization": false,
    "noUnusedLocals": false,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}


require('ts-node').register(options)

require('../cli')
