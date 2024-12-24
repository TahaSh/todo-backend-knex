const knex = require('./connection')

exports.create = async ({ name, email }) => {
  const results = await knex('users').insert({ name, email }).returning('*')
  return results[0]
}

exports.all = async () => {
  return await knex('users')
}
