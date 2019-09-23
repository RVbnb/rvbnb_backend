const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model')
const secrets = require('../config/secrets')

const loginBody = require('../middleware/login-body')
const registerBody = require('../middleware/register-body')

router.post('/register', registerBody, (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;

    Users.add(user)
        .then(response => {
            res.status(201).json({ message: `User created`})
        })
        .catch(error => {
            res.status(500).json({ message: `Error connecting with server, User might already exist`})
        })
})

router.post('/login', loginBody, (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Couldn't connect to login service` });
        });
})

function generateToken(user) {
    const payload = {
        username: user.username,
        is_land_owner: user.is_land_owner
    };

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;