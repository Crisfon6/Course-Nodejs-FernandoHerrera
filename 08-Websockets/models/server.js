const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/sockets-ctrl');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {

        }



        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //setup sSockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded())
            //morgan
            // this.app.use(morgan('dev'))
            // Directorio Público
        this.app.use(express.static('public'));


    }

    routes() {

    }
    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;