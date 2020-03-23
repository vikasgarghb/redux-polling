import jsonServer from 'json-server';
import * as routes from './routes.json';

export function startMockServer(port: number) {
  console.log('Start mock JSON Server');

  const server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(jsonServer.rewriter(routes));

  server.post('/job', (_req, res) => {
    res.jsonp({
      jobId: 1,
      status: 'Created',
    });
  });

  let counter = 0;

  server.get('/job/status', (_req, res) => {
    if (counter === 3) {
      counter = 0;
      res.jsonp('Completed');
      return;
    }
    counter++;
    res.jsonp('Processing');
  });

  server.listen(port, () => {
    console.log('Server started...');
  });
}
