const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

const Listings = require('./listings-model')
const Reservations = require('../reservations/reservations-model')

const authenticate = require('../middleware/authenticate')
const isAvailable = require('../middleware/is-available')
const updateBody = require('../middleware/update-body')

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
                if(res.user.is_land_owner){
                    Reservations.findByListingId(req.params.id)
                        .then(reservations => {
                            res.status(200).json({listing, reservations})
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(500).json(error)
                        })
                } else {
                    Reservations.findByListingIdUser(req.params.id, res.user.id)
                        .then(reservations => {
                            res.status(200).json({listing, reservations})
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(500).json(error)
                        })
                }
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
        listing.owner_id = res.user.id

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
                    Reservations.removeByListingId({ id })
                        .then(response => {
                            res.status(200).json({ message: 'Listing and reservations deleted'})
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(500).json({ message: 'Error connecting with the server'})
                        })
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

router.put('/:id', authenticate, updateBody, (req, res) => {

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

router.get('/:id/reservations', authenticate, (req, res) => {
    if(res.user.is_land_owner){
        Reservations.findByListingId(req.params.id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json(error)
            })
    } else {
        Reservations.findByListingIdUser(req.params.id, res.user.id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json(error)
            })
    }
})

router.post('/:id/reservations', authenticate, isAvailable, (req, res) => {
    let reservation = req.body
    reservation.listing_id = Number(req.params.id)
    reservation.user_id = res.user.id
    
    Reservations.add(reservation)
        .then(response => {
            res.status(201).json({ message: 'Reservation created'})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
})

router.delete("/reservations/:id", authenticate, (req, res) => {
    const { id } = req.params

    Reservations.remove({ id })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
})

module.exports = router