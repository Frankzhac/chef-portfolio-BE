const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// configureRoutes(server);

// server check
server.get('/', (req, res) => {
    res.send('Hello Word'); 
});


module.exports = server;