/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.date('due_date')
    table.string('title', 255)
    table.enu('status', ['to-do', 'in-progress', 'in-review', 'done'], {
      useNative: true,
      enumName: 'task_status'
    })
    table.integer('assigned_to_id').unsigned()
    table
      .foreign('assigned_to_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

    table.integer('project_id').unsigned()
    table
      .foreign('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .raw('DROP TYPE IF EXISTS "task_status"')
}
