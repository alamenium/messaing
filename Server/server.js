const io = require('socket.io')(3000);

io.on('connection', socket=>{
    console.log(socket.id);
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
})


console.log("running on port "+ 4123 + " codename 4.0.1")