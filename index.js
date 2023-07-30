const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', socket=>{
    console.log(socket.id);

    socket.on("send-message", (message, room)=>{
        if(room === '')
            socket.broadcast.emit("receive-message", message);
        else
            socket.to(room).emit("receive-message", message);
    });

    socket.on("join-room", room=> {
        leaveAllRooms(socket);
        socket.join(room)
    });
})

function leaveAllRooms(socket) {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
        // Exclude the default room (socket.id) from leaving
        if (room !== socket.id) {
            socket.leave(room);
            console.log(`Socket left room: ${room}`);
        }
    });
}
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});


console.log("running on port "+ 4123);
