import 'reflect-metadata'
import { Express } from 'express'
import { Connection } from 'typeorm'
const request = require('supertest')
import { MongoMemoryServer } from 'mongodb-memory-server'
import { startDb } from './startDb'
import { Server } from 'http'

let app: { express: Express; dbConnection: Connection }
let server: Server
let dbConnection: Connection
let mongod: MongoMemoryServer

beforeAll(async () => {
  // MONGODB_URL is "mongodb://127.0.0.1:42505/marketplace-test"
  mongod = await startDb()
  const mod = await import('../../src/app')
  app = await (mod as any).getApp()
  dbConnection = app.dbConnection
  server = app.express.listen(3000)
})

afterAll(async () => {
  server.close()
  dbConnection.close()
  await mongod.stop()
})

describe('persistence', () => {
  let id: String

  const template1 = {
    name: 'name 1',
    description: 'description 1',
    radRequest: {
      retrieve: [{ url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }],
      aggregate: [16],
      tally: []
    }
  }

  it('get empty templates', async () => {
    const result = await request(server).get('/templates')
    expect(result.body).toStrictEqual([])
  })

  it('save a template', async () => {
    const result = await request(server)
      .post('/templates')
      .send(template1)
    id = result.body.id
    expect(result.body.id).toBeTruthy()
  })

  it('read saved template', async () => {
    const result = await request(server).get(`/templates/${id}`)
    expect(result.body).toStrictEqual({ ...result.body, id: id })
  }, 10000)
})
