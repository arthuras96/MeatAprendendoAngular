"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// Login
server.post('/login', auth_1.handleAuthentication);
server.use('/orders', authz_1.handleAuthorization);
// Use default router
server.use(router);
// const options = {
//   cert: fs.readFileSync('./backend/keys/cert.pem'),
//   key: fs.readFileSync('./backend/keys/key.pem')
// }
// https.createServer(options, server)
server.listen(3000, function () {
    console.log('JSON Server is running on http://localhost:3000');
});
