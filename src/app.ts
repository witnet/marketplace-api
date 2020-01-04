import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response, Express } from 'express'
import { Routes } from './routes'

export function getApp (): Promise<{
  express: Express
  dbConnection: Connection
}> {
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
            res.send(result)
          }
        }
      )
    })

    // start express server
    return { express: app, dbConnection }
  })
}
