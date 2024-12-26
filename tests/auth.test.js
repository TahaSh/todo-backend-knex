const supertest = require('supertest')
const app = require('../index')
const request = supertest(app)
const knex = require('../db/connection')
const { verifyAccessToken, verifyRefreshToken } = require('../utils')

describe('auth', () => {
  let user

  beforeAll(async () => {
    await knex.migrate.latest()
  })
  afterAll(async () => {
    await knex.migrate.rollback({}, true)
    await knex.destroy()
  })

  beforeEach(async () => {
    await knex('users').del()

    const userRes = await request.post('/users').send({
      email: 'test@example.com',
      name: 'First User',
      password: 'password123'
    })

    user = userRes.body
  })

  async function loginWithCorrectCredentials() {
    return request
      .post('/auth')
      .send({ email: 'test@example.com', password: 'password123' })
  }

  function expectValidAccessToken(accessToken) {
    expect(verifyAccessToken(accessToken)).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      userId: expect.any(Number)
    })
  }

  function expectValidRefreshToken(refreshToken) {
    expect(verifyRefreshToken(refreshToken)).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      userId: expect.any(Number)
    })
  }

  test('login with correct credentials', async () => {
    const res = await loginWithCorrectCredentials()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      access_token: expect.any(String),
      refresh_token: expect.any(String)
    })
    expectValidAccessToken(res.body.access_token)
    expectValidRefreshToken(res.body.refresh_token)
  })

  test('login with invalid credentials', async () => {
    const res = await request
      .post('/auth')
      .send({ email: 'test@example.com', password: 'password12' })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid Credentials')
  })

  test('refresh token', async () => {
    const authRes = await loginWithCorrectCredentials()
    const { refresh_token } = authRes.body
    const res = await request.post('/auth/refresh').send({ refresh_token })
    expect(res.status).toBe(200)

    expect(res.body).toEqual({
      access_token: expect.any(String),
      refresh_token: expect.any(String)
    })
    expectValidAccessToken(res.body.access_token)
    expectValidRefreshToken(res.body.refresh_token)
  })

  test('auth middleware', async () => {
    const authRes = await loginWithCorrectCredentials()
    const { access_token } = authRes.body

    // Test any endpoint with auth middleware
    const invalidHeaderRes = await request.get('/orgs')
    expect(invalidHeaderRes.status).toBe(401)
    expect(invalidHeaderRes.body).toEqual({
      message: 'Invalid Authorization Header'
    })

    const invalidTokenRes = await request
      .get('/orgs')
      .set('authorization', `Bearer invalid`)

    expect(invalidTokenRes.status).toBe(401)
    expect(invalidTokenRes.body).toEqual({
      message: 'Invalid Access Token'
    })

    const res = await request
      .get('/orgs')
      .set('authorization', `Bearer ${access_token}`)

    expect(res.status).toBe(200)
  })
})
