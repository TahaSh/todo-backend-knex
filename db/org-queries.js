const knex = require('./connection')

exports.create = async ({ name, ownerId }) => {
  const results = await knex('organizations')
    .insert({ name, owner_id: ownerId })
    .returning('*')
  return results[0]
}

exports.allForUser = async (userId) => {
  return await knex('organizations')
    .join('users', 'users.id', 'organizations.owner_id')
    .select(
      'organizations.*',
      'users.id as userId',
      'users.email as userEmail',
      'users.name as userName'
    )
    .where('owner_id', userId)
}
