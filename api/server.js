const express = require('express');
const cors = require('cors')
const helmet = require('helmet');

const authenticate = require('../middleware/authenticate')
const authRouter = require('../auth/auth-router')

const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json());

server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/api/listings', authenticate, (req, res) => {
    res.status(200).json({ message: 'User Allowed In!'})
})

module.exports = server;