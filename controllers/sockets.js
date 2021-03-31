const TicketControl = require("../models/ticket-control");
const ticketControl = new TicketControl

const socketController = (socketClient) => {
    
    socketClient.on('disconnect', () => {});

    socketClient.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socketClient.broadcast.emit('enviar-mensaje', payload );

    })

}

module.exports = {
    socketController
}

