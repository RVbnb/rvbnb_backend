const db = require('../database/db-config')

module.exports = {
    add,
    findByListingId,
    findByListingIdUser,
    remove,
    removeByListingId
}

function add(reservation) {
    return db('reservations').insert(reservation)
}

function findByListingId(listing_id) {
    return db('reservations').where('listing_id', listing_id)
}

function findByListingIdUser(listing_id, user_id) {
    return db('reservations').where('listing_id', listing_id).where('user_id', user_id)
}

function remove(id) {
    return db('reservations').where(id).delete();
}

function removeByListingId(id) {
    return db('reservations').where('listing_id', id).delete()
}