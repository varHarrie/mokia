import 'mocha';
import request from 'supertest';
import http from 'http';
import { createServer, ServerConfig } from '../src';

const config: any = {
  host: 'localhost',
  port: 3000,
  prefix: '/api',
  'GET /user': (req: any) => ({ id: req.query.id, name: 'Foo' }),
};

describe('GET /user', function () {
  let app: http.Server;
  let destroy: () => void;

  before(async () => {
    [app, destroy] = await createServer(config as ServerConfig);
  });

  after(() => {
    destroy();
  });

  it('should be ok', (done) => {
    request(app).get('/api/user?id=10').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, { id: '10', name: 'Foo' }, done);
  });
});
