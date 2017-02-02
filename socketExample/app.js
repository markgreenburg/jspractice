const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    // socket.broadcast.emit("connect notice", "new user connected");
    socket.on("entered chatroom", (nickname) => {
        socket.broadcast.emit("entered chatroom", nickname + " entered the chatroom");
        socket.username = nickname;
    });
    socket.on("chat message", (msg) => socket.broadcast.emit("chat message", socket.username + ": " + msg));
    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnect notice", "user disconnected");
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

