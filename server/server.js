require( '../config/config');

const express = require( 'express' );
const socketIO = require( 'socket.io' );
const http = require( 'http' );
const path = require( 'path' );
const mongoose = require( 'mongoose' );


const app = express();
const server = http.createServer( app );

const publicPath = path.resolve( __dirname, '../public' );
const port = process.env.PORT || 3000;

app.use( express.static( publicPath ));

module.exports.io = socketIO( server );
require( './sockets/socket' );

mongoose.connection.openUri( process.env.URLDB, { useNewUrlParser: true },
    ( err ) => {
        const tryError = err
            ? () => { throw err }
            : () => { console.log( 'Data base ONLINE' )};
        tryError();
    });


server.listen( port, ( err ) => {

    if ( err ) throw new Error( err );

    console.log( `Server running on the port ${ port }` );

});