import { Server } from 'http'
import app from './app'
const http = require('http')

const port: number = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 8000
app.set('port', port)

const server: Server = http.createServer(app)
server.listen(port)

console.log(`Listening on port ${port}`)

