
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments()
            tbl.string('username', 128).notNullable().unique()
            tbl.string('password', 128).notNullable()
            tbl.boolean('is_land_owner').notNullable();
            tbl.integer('reserve_id')
            tbl.date('reserve_date_start')
            tbl.date('reserve_date_end')
        })
        // .createTable('listings', tbl => {
        //     tbl.increments()
        //     tbl
        //         .integer('owner_id')
        //         .unsigned()
        //         .references('id')
        //         .inTable('users')
        //         .onDelete('CASCADE')
        //         .onUpdate('CASCADE')
        //     tbl.string('location', 128).notNullable().unique()
        //     tbl.string('description', 255).notNullable()
        //     tbl.decimal('price_per_day', 8, 2).notNullable()
        //     tbl.string('photo').notNullable()
        // })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
};
