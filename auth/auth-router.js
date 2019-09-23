const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model')
const secrets = require('../config/secrets')

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;

    Users.add(user)
        .then(addedUser => {
            res.status(201).json(addedUser)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post('/login', (req, res) => {
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
        role: user.role
    };

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;