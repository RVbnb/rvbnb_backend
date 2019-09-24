const db = require('../database/db-config')

module.exports = {
    find,
    add,
    findById
}

function find() {
    return db('listings')
}

function add(listing) {
    return db('listings').insert(listing)
}

function findById(id) {
    return db('listings').where(id).first()
}