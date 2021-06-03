<p align="center">
  <a href="https://varharrie.github.io/mokia/" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/varharrie/mokia/master/packages/docs/docs/.vuepress/public/logo.png" alt="logo">
  </a>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/mokia?minimal=true">
    <img src="https://img.shields.io/npm/dm/mokia.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/mokia">
    <img src="https://img.shields.io/npm/v/mokia.svg" alt="Version">
  </a>
  <a href="https://github.com/varharrie/mokia/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/mokia.svg" alt="License">
  </a>
  <a href="https://github.com/varHarrie/mokia/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">
    <img src="https://img.shields.io/github/issues/varharrie/mokia.svg" alt="Issues">
  </a>
</p>

# Mokia

🐒 A data mocking library.

Documentation: [中文](https://varharrie.github.io/mokia/)

## Basic Usage

Install `mokia`:

```bash
npm install --save mokia
```

Create entry file (e.g. index.js):

```javascript
// index.js

const mock = require('mokia');

module.exports = {
  port: 3000,
  'GET /users': mock.list({ id: mock.uuid(), name: mock.fullName() }),
  'GET /users/:id': (req) => ({ id: req.params.id, name: mock.fullName() }),
};
```

Start local http server:

```bash
npx @mokia/cli index.js

# Or install it globally
npm i -g @mokia/cli
mokia index.js
```

## Advanced Usage

TypeScript Support and Class-style mock schema:

```typescript
// index.ts

import mock from 'mokia';

class User {
  @mock.uuid()
  id: string;

  @mock.fullName()
  name: string;

  constructor(id?: string) {
    if (id) this.id = id;
  }
}

class Article {
  @mock.uuid()
  id: string;

  @mock.generate(User)
  author: User;

  @mock.passage()
  content: string;

  constructor(id?: string) {
    if (id) this.id = id;
  }
}

export default {
  port: 3000,
  'GET /users': mock.list(User),
  'GET /users/:id': (req) => new User(req.params.id),
  'GET /articles': mock.list(Article),
  'GET /articles/:id': (req) => new Article(req.params.id),
};
```

### License

[MIT](./LICENSE)
