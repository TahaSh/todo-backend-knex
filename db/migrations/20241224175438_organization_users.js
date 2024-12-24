/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('organization_users', (table) => {
    table.increments('id')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.enu('role', ['admin', 'member'])
    table.integer('user_id').unsigned()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

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
  return knex.schema.dropTableIfExists('organization_users')
}
