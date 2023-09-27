const express = require('express');
const cors = require('cors');
const routes = require('../routes/routes');

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/v1/clima', routes);
        this.app.all('*', (res) => {
            res.status(404).json({ message: '404 Page Not Found' });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
