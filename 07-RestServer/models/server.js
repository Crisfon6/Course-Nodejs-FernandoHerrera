const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            "auth": '/api/auth',
            "user": '/api/usuarios',
            "categories": '/api/categories',
            "products": '/api/products',
            "search": '/api/search',
            "uploads": '/api/uploads'
        }


        //Database
        this.connectDB()
            // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded())
            //morgan
        this.app.use(morgan('dev'))
            // Directorio Público
        this.app.use(express.static('public'));
        //file uploads
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            })
        );

    }

    routes() {
        this.app.use(this.paths.user, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;