import 'reflect-metadata'
import { Express } from 'express'
import { Connection } from 'typeorm'
const request = require('supertest')
import { MongoMemoryServer } from 'mongodb-memory-server'
import { startDb } from './startDb'
let app: { express: Express; dbConnection: Connection }
let server
let dbConnection: Connection
let mongod: MongoMemoryServer

beforeAll(async () => {
  // MONGODB_URL is "mongodb://127.0.0.1:42505/marketplace-test"
  mongod = await startDb()
  const mod = await import('../../src/app')
  app = await (mod as any).getApp()
  dbConnection = app.dbConnection
  server = app.express.listen(4000)
})

afterAll(async () => {
  server.close()
  dbConnection.close()
  await mongod.stop()
})

describe('Endpoints', function () {
  describe('Template', () => {
    it('GET /templates', async function () {
      const result = await request(server).get('/templates')
      expect(result.status).toBe(200)
    })

    describe('POST /templates', function () {
      describe('save a correct template', () => {
        it('returns the correct status code', async () => {
          const result = await request(server)
            .post('/templates')
            .send({
              name: 'Template 1',
              description: 'Description 1',
              radRequest: {
                retrieve: [
                  { url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }
                ],
                aggregate: [16],
                tally: []
              }
            })
          expect(result.status).toBe(200)
        })

        it('returns the saved template', async () => {
          const template = {
            name: 'Template 1',
            description: 'Description 1',
            radRequest: {
              retrieve: [{ url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }],
              aggregate: [16],
              tally: []
            }
          }
          const result = await request(server)
            .post('/templates')
            .send(template)
          expect(result.body).toMatchObject({ ...template })
          expect(typeof result.body.id).toBe('string')
        })
      })

      describe('NOT save wrong Template', () => {
        it('returns the correct status code', async () => {
          const result = await request(server)
            .post('/templates')
            .send({
              radRequest: {},
              name: '',
              description: 'description'
            })
          expect(result.status).toBe(400)
        })

        it('status code 400 when template is empty ', async () => {
          const result = await request(server)
            .post('/templates')
            .send({})
          expect(result.status).toBe(400)
        })

        describe('receive error message when field', () => {
          describe('name', () => {
            it('is empty', async () => {
              const result = await request(server)
                .post('/templates')
                .send({
                  description: 'description',
                  name: '',
                  radRequest: {
                    retrieve: [
                      { url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }
                    ]
                  }
                })
              expect(
                JSON.parse(result.text)[0].constraints.isNotEmpty
              ).toBeTruthy()
            })

            it('is not string', async () => {
              const result = await request(server)
                .post('/templates')
                .send({
                  description: 'description',
                  name: 3,
                  radRequest: {
                    retrieve: [
                      { url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }
                    ]
                  }
                })
              expect(
                JSON.parse(result.text)[0].constraints.isString
              ).toBeTruthy()
            })
          })
          describe('description', () => {
            it('is empty', async () => {
              const result = await request(server)
                .post('/templates')
                .send({
                  description: '',
                  name: 'name',
                  radRequest: {
                    retrieve: [
                      { url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }
                    ]
                  }
                })
              expect(
                JSON.parse(result.text)[0].constraints.isNotEmpty
              ).toBeTruthy()
            })

            it('is not string', async () => {
              const result = await request(server)
                .post('/templates')
                .send({
                  description: 3,
                  name: 'name',
                  radRequest: {
                    retrieve: [
                      { url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }
                    ]
                  }
                })
              expect(
                JSON.parse(result.text)[0].constraints.isString
              ).toBeTruthy()
            })
          })

          describe('radRequest', () => {
            it('is empty', async () => {
              const result = await request(server)
                .post('/templates')
                .send({
                  description: 'description',
                  name: 'name',
                  radRequest: ''
                })
              expect(
                JSON.parse(result.text)[0].constraints.isNotEmpty
              ).toBeTruthy()
            })
          })
        })
      })
    })
  })
})
