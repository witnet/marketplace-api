import 'reflect-metadata'
import * as supertest from 'supertest'
import { getApp } from '../src/app'
import { SuperTest, Test } from 'supertest'

/**
 * Get an Application instance wrapped in SuperTest
 * for use in unit tests
 */
// export async function getTestApp (): Promise<SuperTest<Test> | void> {
//   return await getApp()
//     .then(app => supertest(app))
//     .catch(e => console.log(e))
// }
