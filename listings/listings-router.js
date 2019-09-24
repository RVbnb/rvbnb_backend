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
            if (listing) {
                res.status(200).json(listing)
            } else {
                res.status(404).json({ message: `Listing does not exist` })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post('/', authenticate, (req, res) => {
    console.log(res.user)
    if (res.user.is_land_owner) {
        let listing = req.body

        Listings.add(listing)
            .then(response => {
                res.status(201).json({ message: 'Listing created' })
            })
            .catch(error => {
                res.status(500).json({ message: 'Error connect with server, Location might already exist' })
            })
    } else {
        res.status(401).json({ message: 'Logged in user has no access' })
    }
})

router.delete('/:id', authenticate, (req, res) => {
    if (res.user.is_land_owner) {
        const { id } = req.params

        Listings.remove({ id })
            .then(response => {
                console.log(response)
                if (response) {
                    res.status(200).json({ message: 'Listing deleted' })
                } else {
                    res.status(404).json({ message: `Listing does not exist` })
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'Error connect with server' })
            })
    } else {
        res.status(401).json({ message: 'Logged in user has no access' })
    }
})

router.put('/:id', authenticate, (req, res) => {

    if (res.user.is_land_owner) {
        const { id } = req.params
        const listing = req.body

        Listings.update({ id }, listing)
            .then(response => {
                if (response) {
                    res.status(200).json({ message: 'Listing updated' })
                } else {
                    res.status(404).json({ message: `Listing does not exist` })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json(error)
            })
    } else {
        res.status(401).json({ message: 'Logged in user has no access' })
    }
})

module.exports = router