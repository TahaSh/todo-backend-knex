const knex = require('./connection')
const { hashPassword } = require('../utils')

exports.create = async ({ name, email, password }) => {
  const hashedPassword = await hashPassword(password)
  const results = await knex('users')
    .insert({ name, email, password: hashedPassword })
    .returning(['id', 'email', 'name', 'created_at'])
  return results[0]
}

exports.byEmail = async (email) => {
  return await knex('users').where('email', email).first()
}

exports.all = async () => {
  return await knex('users')
}
