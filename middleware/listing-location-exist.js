const Listings = require('../listings/listings-model')

module.exports = (req, res, next) => {
    const { location } = req.body

    Listings.findBy({ location })
        .then(response => {
            if(response.length > 0){
                res.status(400).json({ message: 'Location Already Exists'})
            } else {
                next()
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error connecting with the server'})
        })
}