import * as express from 'express';
import * as http from 'http';
import * as ws from 'socket.io';

const app: express.Express = express();
const port: number = 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

const httpServer: http.Server = http.createServer(app);
const wsServer: ws.Server = ws(httpServer);

wsServer.on('connection', (socket) => {
  console.log(`User #${socket.id} connected`);
  console.log(`Token: ${socket.handshake.query.token}\n`);
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}\n`);
});