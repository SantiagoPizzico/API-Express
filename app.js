require('dotenv').config();
const Server = require('./models/server');
const cors = require('cors');

const svr = new Server();
svr.listen();
