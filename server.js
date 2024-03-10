import express from 'express';
import injectRoutes from './routes';

const port = process.env.PORT || 5000;
const env = process.env.npm_lifecycle_event || 'dev';

const server = express();

injectRoutes(server);
server.listen(port, () => {
  console.log(`[${env}] API has started listening at port:${port}`);
});

export default server;
