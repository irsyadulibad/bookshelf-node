const Hapi = require('@hapi/hapi');
const routes = require('./routes');

async function init() {
  const server = new Hapi.Server({
    host: '0.0.0.0',
    port: 5000,
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
}

init();
