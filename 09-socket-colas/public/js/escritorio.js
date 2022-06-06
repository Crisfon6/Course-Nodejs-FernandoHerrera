const lblDesktop = document.querySelector('h1');
const attendBtn = document.querySelector('button');
const ticketSmall = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const pending = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);
const socket = io();




if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The desktop is mandatory');
}
const desktop = searchParams.get('escritorio');

lblDesktop.innerHTML += ' ' + desktop;
divAlert.style.display = 'none';



socket.on('connect', () => {
    //connect to the server

    attendBtn.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    attendBtn.disabled = true;

});


socket.on('on-tail', (tickets) => {
    // console.log('Desconectado del servidor');
    pending.innerHTML = tickets;
});


attendBtn.addEventListener('click', () => {
    // const payload =
    socket.emit('attend-ticket', { desktop }, ({ ok, ticket }) => {
        if (!ok) {
            ticketSmall.innerHTML = 'No one ';
            divAlert.style.display = '';
            attendBtn.disabled = true;
            return;
        }

        ticketSmall.innerHTML = 'Ticket ' + ticket.number;
    });

    socket.on('on-tail', (tickets) => {
        // console.log('Desconectado del servidor');
        pending.innerHTML = tickets;
    });

});