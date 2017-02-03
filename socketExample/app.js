const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    // When username received, broadcast notice to all other connections
    socket.on("entered chatroom", (nickname) => {
        socket.broadcast.emit("entered chatroom", nickname + " has joined");
        socket.username = nickname;
    });
    
    // When new chat message received, broadcast it to all other connections
    socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", socket.username + ": " + msg)
    });

    // When user disconnects, broadcast notice to all other connections
    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnect notice", socket.username + 
            " has left");
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});