const TicketControl = require('../models/ticket-ctrl');

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);

    socket.emit('on-tail', ticketControl.tickets.length);

    socket.on('attend-ticket', ({ desktop }, callback) => {
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'The desktop is mandatory'
            });
        }

        const ticket = ticketControl.attendTicket(desktop);
        if (!ticket) {
            callback({
                ok: false,
                msg: 'Not exist tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });

    socket.on('create-ticket', (payload, callback) => {

        const next = ticketControl.nextTicket();
        callback(next);

        // TODO: notify new ticket

    });

}



module.exports = {
    socketController
}