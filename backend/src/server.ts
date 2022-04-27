import express from 'express';
import { createServer } from 'http';
import { config, connectDB } from './config';
import { Server } from 'socket.io';
import { configureRoutes } from './routes';
import { configureMiddleware } from './middleware';
import { init as _0xMNISocket } from './socket';

// Connect and get reference to db
let db: any;

(async () => {
  db = await connectDB();
})();

// Init express app
const app = express();

// Config Express middleware
configureMiddleware(app);

// Set-up routes
configureRoutes(app);

// Start server and listen for connections
const httpServer = createServer(app);

httpServer.listen(config.PORT || 5000, () => {
  console.info(`Server started on `, httpServer.address());
});
// Initializing Socket.io
const io = new Server(httpServer, {
  // Specifying CORS
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => _0xMNISocket(socket, io));

// Erorr handling - close server if error
// process.on('uncaughtException', (err) => {
//   db.disconnect();

//   console.error(`Error: ${err.message}`);

//   httpServer.close(() => {
//     process.exit(1);
//   });
// });
