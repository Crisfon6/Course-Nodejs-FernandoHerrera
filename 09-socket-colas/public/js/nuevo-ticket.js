const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btn = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    //connect to the server
    socket.on('last-ticket', (ticket) => {
        lblNuevoTicket.innerHTML = `Ticket ${ticket}`;
    });
    btn.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btn.disabled = true;

});




btn.addEventListener('click', () => {

    socket.emit('create-ticket', null, (ticket) => {
        lblNuevoTicket.innerHTML = ticket;
    });

});
console.log('Nuevo Ticket HTML');