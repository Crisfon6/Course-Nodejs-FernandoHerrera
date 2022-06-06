const socketController = (socket) => {

    console.log(`client connected ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Client disconnect ${socket.id}`);
    });
    socket.on('send-msg', (payload, callback) => {
        const id = 1234;

        socket.broadcast.emit('send-msg', payload);
        callback(id);
    })
}

module.exports = {
    socketController
}