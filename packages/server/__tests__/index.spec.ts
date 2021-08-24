import request from 'supertest';
import http from 'http';
import { createServer, ServerConfig } from '../src';

const config: ServerConfig = {
  host: 'localhost',
  port: 3000,
  prefix: '/api',
  'GET /user': (req) => ({ id: req.query.id, name: 'Foo' }),
};

let app: http.Server;
let destroy: () => void;

beforeAll(async () => {
  [app, destroy] = await createServer(config);
});

afterAll(() => {
  destroy();
});

describe('GET /user', () => {
  it('should be ok', (done) => {
    request(app).get('/api/user?id=10').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, { id: '10', name: 'Foo' }, done);
  });
});
