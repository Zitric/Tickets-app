const { io } = require('../server');
const { TicketControl } = require( '../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit( 'sendMessage', {
        user: 'Admin',
        message: 'Welcome, you are connected to the socket'
    });



    client.on( 'disconnect', () => {
        console.log( 'User disconnected' );
    });



    // Escuchar el cliente
    client.on( 'sendMessage', ( data , callback ) => {

        console.log('data: ', data);

        // Emit to all users connected
        client.broadcast.emit( 'sendMessage', data );

        // if ( message.user ) {
        //     callback({
        //         res: 'Everything is ok'
        //     });
        // } else {
        //     callback({
        //         res: 'The user dont exist, ERROR'
        //     });
        // }

    });

});