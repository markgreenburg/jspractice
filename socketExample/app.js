const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let users = [];

io.on("connection", (socket) => {
    // When username received, broadcast notice to all other connections
    socket.on("entered chatroom", (nickname) => {
        socket.username = nickname;
        socket.broadcast.emit("entered chatroom", socket.username);
    });
    
    // When new chat message received, broadcast it to all other connections
    socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg)
    });

    // When user done typing, broadcast info to all other connections
    socket.on("done typing", (user) => {
        socket.broadcast.emit("typing finished", socket.username);
    });

    // When user is typing, broadcast that fact to all other connections
    socket.on("started typing", () => {
        socket.broadcast.emit("user typing", socket.username);
    });

    // When user disconnects, broadcast notice to all other connections
    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnect notice", socket.username);
        users.filter(removeDisconnected);
    });
});

// Remove disconnected users
const removeDisconnected = (user) => (user !== socket.username);

http.listen(3000, () => {
    console.log('listening on *:3000');
});