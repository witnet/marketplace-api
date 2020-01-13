import 'reflect-metadata'
import { getApp } from './app'

getApp()
  .then(app => {
    app.express.listen(process.env.PORT || 3000)

    console.log(
      `Express server has started on port ${process.env.PORT || 3000}. Open http://localhost:3000/templates to see results`
    )
  })
  .catch(error => console.log(error))
