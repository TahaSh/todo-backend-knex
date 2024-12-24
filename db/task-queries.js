const knex = require('./connection')

exports.createInProject = async ({ projectId, title, status }) => {
  const results = await knex('tasks')
    .insert({ project_id: projectId, title, status })
    .returning('*')
  return results[0]
}

exports.allInProject = async (projectId) => {
  return await knex('tasks').where('project_id', projectId)
}

exports.assign = async ({ taskId, userId }) => {
  const result = await knex('tasks')
    .where('id', taskId)
    .update({ assigned_to_id: userId })
    .returning('*')
  return result[0]
}
