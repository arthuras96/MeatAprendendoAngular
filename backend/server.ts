import * as jsonServer from 'json-server'
import { Express } from 'express'

import * as fs from 'fs'
import * as https from 'https'

import { handleAuthentication } from './auth'
import { handleAuthorization } from './authz'

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Login
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

// Use default router
server.use(router)

// const options = {
//   cert: fs.readFileSync('./backend/keys/cert.pem'),
//   key: fs.readFileSync('./backend/keys/key.pem')
// }

// https.createServer(options, server)

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000')
})
