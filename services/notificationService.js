const WebSocket = require('ws');

// In-memory storage for messages (could be replaced with a database)
let messageStorage = {};  // { userId: [message1, message2, ...] }
let wss;

exports.init = (server) => {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (client, req) => {
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const userId = urlParams.get('userId');
        
        // Set the userId on the client object
        client.userId = userId;

        // Send any missed messages to the user upon connection
        if (messageStorage[userId]) {
            messageStorage[userId].forEach((message) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ message }));
                }
            });

            // Clear the stored messages after sending them
            delete messageStorage[userId];
        }

        // Handle disconnection to cleanup if necessary
        client.on('close', () => {
            console.log(`User disconnected with ID: ${userId}`);
        });

        console.log(`User connected with ID: ${userId}`);
    });
};

exports.notifyUser = (userId, message) => {
    if (!wss) return;

    let userConnected = false;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.userId === userId) {
            userConnected = true;
            client.send(JSON.stringify({ message }));
        }
    });

    // If the user is not connected, store the message
    if (!userConnected) {
        if (!messageStorage[userId]) {
            messageStorage[userId] = [];
        }
        messageStorage[userId].push(message);
    }
};
