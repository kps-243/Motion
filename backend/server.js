require('dotenv').config();

const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/db');

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);

const errorHandler = error => {
  if (error.syscall !== 'listen') throw error;

  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

connectDB()
  .then(() => {

    server.on('error', errorHandler);
    server.on('listening', () => {
      const address = server.address();
      const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
      console.log(`Serveur lancé sur ${bind}`);
    });

    server.listen(port);
  })
  .catch(err => {
    console.error('Impossible de démarrer le serveur :', err.message);
  });
