const WebSocket = require('ws');

exports.init = (server) => {
    const wss = new WebSocket.Server({ server });
    // console.log(server);
  
wss.on('connection', (ws, req) => {
    const userId = req.url.split('?userId=')[1];
    ws.userId = userId;
    wss.clients.forEach((clients)=>{
        console.log(clients.userId)
    });
    ws.on('message', (message) => {
        console.log(`Received message from user ${userId}: ${message}`);
    });

    ws.on('close', () => {
        console.log(`User ${userId} disconnected`);
    });
});
};
