const db = require('../database/db-config')

module.exports = {
    find,
    add,
    findById,
    remove,
    update
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

function remove(id) {
    return db('listings').where(id).delete()
}

function update(id, listing) {
    return db('listings').where(id).update(listing)
}