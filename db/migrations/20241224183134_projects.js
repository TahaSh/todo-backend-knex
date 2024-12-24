/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.string('name', 100).notNullable()
    table.integer('org_id').unsigned()
    table
      .foreign('org_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('projects')
}
