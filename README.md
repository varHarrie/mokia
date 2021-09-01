<p align="center">
  <a href="https://varharrie.github.io/mokia/" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/varharrie/mokia/master/packages/docs/docs/.vuepress/public/logo.png" alt="logo">
  </a>
</p>

<p align="center">
  <a href="https://github.com/varharrie/mokia/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/mokia.svg" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/mokia">
    <img src="https://img.shields.io/npm/v/mokia.svg" alt="Version">
  </a>
  <a href="https://npmcharts.com/compare/mokia?minimal=true">
    <img src="https://img.shields.io/npm/dm/mokia.svg" alt="Downloads">
  </a>
  <a href="https://github.com/varHarrie/mokia/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc">
    <img src="https://img.shields.io/github/issues/varharrie/mokia.svg" alt="Issues">
  </a>
</p>

# Mokia

🐒 An out of the box mock API server to help quickly create back-end prototype and data simulations.

Documentation: [中文](https://varharrie.github.io/mokia/)

## Basic Usage

Install `mokia`:

```bash
npm install --save mokia
```

Create entry file (e.g. index.js):

```javascript
// index.js

const mokia = require('mokia');

module.exports = {
  port: 3000,
  'GET /users': mokia.list({ id: mokia.uuid(), name: mokia.fullName() }),
  'GET /users/:id': (req) => ({ id: req.params.id, name: mokia.fullName() }),
};
```

Add to scripts in package.json:

```json
{
  "scripts": {
    "mock": "mokia index.js"
  }
}
```

Start local http server:

```bash
npm run mock
```

Open browser and go to http://localhost:3000/users, you will get the response.

## Advanced Usage

TypeScript Support and Class-style mock schema:

```typescript
// index.ts

import mokia from 'mokia';

class User {
  @mokia.uuid()
  id: string;

  @mokia.fullName()
  name: string;

  constructor(id?: string) {
    if (id) this.id = id;
  }
}

class Article {
  @mokia.uuid()
  id: string;

  @mokia.generate(User)
  author: User;

  @mokia.passage()
  content: string;

  constructor(id?: string) {
    if (id) this.id = id;
  }
}

export default mokia.defineConfig({
  port: 3000,
  'GET /users': mokia.list(User),
  'GET /users/:id': (req) => new User(req.params.id),
  'GET /articles': mokia.list(Article),
  'GET /articles/:id': (req) => new Article(req.params.id),
});
```

### License

[MIT](./LICENSE)
