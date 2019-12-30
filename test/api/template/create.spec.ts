import 'reflect-metadata'
import { Express } from 'express'
import { Connection } from 'typeorm'
const request = require('supertest')

describe('POST /template', function () {

  let app: { express: Express, dbConnection: Connection }
  let server
  let dbConnection : Connection
  beforeAll(async () => {
    const mod = await import('../../../src/app')
    app = await (mod as any).getApp()
    dbConnection = app.dbConnection
    server = app.express.listen(3000)
  })

  afterAll(() => {
    server.close()
    dbConnection.close()
  });

  it('getUsers', async function()  {
    const result = await request(server).get('/users')
    expect(result.status).toBe(200)
  })
})
