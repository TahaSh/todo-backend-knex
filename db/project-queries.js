const knex = require('./connection')

exports.create = async ({ name, orgId }) => {
  const results = await knex('projects')
    .insert({ name, org_id: orgId })
    .returning('*')
  return results[0]
}

exports.get = async (id) => {
  return await knex('projects').where('id', id).first()
}
