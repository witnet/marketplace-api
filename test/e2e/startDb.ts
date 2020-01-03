import 'reflect-metadata'
import { MongoMemoryServer } from 'mongodb-memory-server'

export async function startDb (): Promise<MongoMemoryServer> {
  const mongod = new MongoMemoryServer({
    instance: {
      port: 42505,
      dbName: 'marketplace-test'
    }
  })
  await mongod.ensureInstance()
  return mongod
}

export default startDb
