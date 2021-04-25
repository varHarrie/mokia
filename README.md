# Mokia

🐒 A data mocking library.

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
npx mokia index.js
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
