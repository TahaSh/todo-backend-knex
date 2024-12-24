/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('organizations', (table) => {
    table.increments('id')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.string('name', 100).notNullable()
    table.integer('owner_id').unsigned()
    table
      .foreign('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('organizations')
}
