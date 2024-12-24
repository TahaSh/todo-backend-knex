const knex = require('./connection')

exports.addUserToOrg = async ({ orgId, userId, role }) => {
  const results = await knex('organization_users')
    .insert({
      org_id: orgId,
      user_id: userId,
      role
    })
    .returning('*')
  return results[0]
}

exports.allUsersInOrg = async (orgId) => {
  return await knex('organization_users')
    .join('users', 'users.id', 'organization_users.user_id')
    .join('organizations', 'organizations.id', 'organization_users.org_id')
    .select(
      'organizations.id as orgId',
      'organizations.name as orgName',
      'users.name as userName',
      'users.email as userEmail'
    )
    .where('organization_users.org_id', orgId)
}
