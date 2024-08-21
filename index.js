const http = require('http');
const app = require('./app');
const socketService = require('./sockets/socket');
const notificationService = require('./services/notificationService');

const server = http.createServer(app);

// socketService.init(server);

notificationService.init(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
