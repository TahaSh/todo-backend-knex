/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.string('name', 100).notNullable()
    table.string('email', 100).unique().notNullable()
    table.string('password', 255).notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
