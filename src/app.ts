import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response, Express } from 'express'
import { Routes } from './routes'
import { User } from './entity/User'
import { Template } from './entity/Template'

export function getApp (): Promise<{ express: Express, dbConnection: Connection }> {
  return createConnection().then(async dbConnection => {
    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
      ;(app as Express)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          )
          if (result instanceof Promise) {
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            )
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        }
      )
    })

    // setup express app here
    // ...

    // insert new users for test
    await dbConnection.manager.save(
      dbConnection.manager.create(User, {
        firstName: 'Timber',
        lastName: 'Saw',
        age: 27
      })
    )

    await dbConnection.manager.save(
      dbConnection.manager.create(User, {
        firstName: 'Phantom',
        lastName: 'Assassin',
        age: 24
      })
    )

    // insert new users for test
    await dbConnection.manager.save(
      dbConnection.manager.create(Template, {
        name: 'Get BTC price',
        description: 'Retrieve bitcoin price from some apis',
        radRequest: {
          retrieve: [{ url: '', kind: 'HTTP-GET', script: [128, [67, 5]] }],
          aggregate: [16],
          tally: []
        }
      })
    )
    // start express server
    return { express: app, dbConnection }
  })
}
