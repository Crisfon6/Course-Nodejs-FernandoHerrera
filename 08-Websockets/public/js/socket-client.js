//refs html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});
socket.on('disconnect', () => {

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});
socket.on('send-msg', (payload) => {
    console.log(payload);
})
btnSend.addEventListener('click', () => {
    const msg = txtMsg.value;
    const payload = {
        msg,
        id: '1314',
        date: new Date().getTime()
    }
    socket.emit('send-msg', payload, (id) => {
        console.log(id);
    });
});