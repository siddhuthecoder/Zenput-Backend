const WebSocket = require('ws');
let wss;

exports.init = (server) => {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (client, req) => {
        // Assuming you pass the userId as a query parameter in the WebSocket URL
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const userId = urlParams.get('userId');
        
        // Set the userId on the client object
        client.userId = userId;

        // console.log("Connected Successfully");
        // console.log(`User connected with ID: ${userId}`);
    });
};

exports.notifyUser = (userId, message) => {
    if (!wss) return;

    wss.clients.forEach((client) => {
        console.log(client.userId); // This should now log the correct userId
        if (client.readyState === WebSocket.OPEN && client.userId === userId) {
            client.send(JSON.stringify({ message }));
        }
    });
};
