import 'reflect-metadata'
import { Express } from 'express'
import { Connection } from 'typeorm'
const request = require('supertest')

describe('test endpoints', function() {

  let app: { express: Express, dbConnection: Connection }
  let server
  let dbConnection : Connection

  beforeAll(async () => {
    const mod = await import('../../src/app')
    app = await (mod as any).getApp()
    dbConnection = app.dbConnection
    server = app.express.listen(3000)
  })

  afterAll(() => {
    server.close()
    dbConnection.close()
  });

  describe('GET /templates', function () {
    it('getTemplates', async function()  {
      const result = await request(server).get('/templates')
      expect(result.status).toBe(200)
    })
  })
  
  describe('POST /templates', function () {
    it('postTemplates', async function()  {
      const result = await request(server)
        .post('/templates')
        .send({
          name: 'Get BTC price',
          description: 'Retrieve bitcoin price from some apis',
          radRequest: {
            retrieve: [{ url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }],
            aggregate: [16],
            tally: []
          }
        })
      expect(result.status).toBe(200)
    })
  })
  
  describe('GET /template', function () {
    it('getTemplate', async function()  {
      const templatesReq = await request(server).get('/templates')
      const templateId = templatesReq.body[0].id
      const result = await request(server)
        .get(`/templates/${templateId}`)
      console.log(templateId)
      expect(result.status).toBe(200)
    })
  })
  
  describe('GET /users', function () {
    it('getUsers', async function()  {
      const result = await request(server).get('/users')
      expect(result.status).toBe(200)
    })
  })
  
  describe('POST /users', function () {
    it('postUsers', async function()  {
      const result = await request(server)
        .post('/users')
        .send({
          firstName: 'Timber',
          lastName: 'Saw',
          age: 27
        })
      expect(result.status).toBe(200)
    })
  })
  
  describe('GET /user', function () {
    it('getUser', async function()  {
      const usersReq = await request(server).get('/users')
      const userId = usersReq.body[0].id
      const result = await request(server)
        .get(`/users/${userId}`)
      console.log(userId)
      expect(result.status).toBe(200)
    })
  })
  
})
