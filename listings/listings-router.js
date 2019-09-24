const router = require('express').Router();
const jwt = require('jsonwebtoken')

const Listings = require('./listings-model')

const authenticate = require('../middleware/authenticate')
const isLandOwner = require('../middleware/is-land-owner')

router.get('/', authenticate, (req, res) => {
    Listings.find()
        .then(listings => {
            res.status(200).json(listings)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params

    Listings.findById({ id })
        .then(listing => {
            if(listing) {
                res.status(200).json(listing)
            } else {
                res.status(500).json({ message: `Listing does not exist`})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post('/', authenticate, (req, res) => {
    console.log(res.user)
    if(res.user.is_land_owner) {
        let listing = req.body

        Listings.add(listing)
            .then(response => {
                res.status(201).json({ message: 'Listing created'})
            })
            .catch(error => {
                res.status(500).json({ message: 'Error connect with server, Location might already exist'})
            })
    } else {
        res.status(401).json({ message: 'Logged in user has no access to POST'})
    }
})

module.exports = router