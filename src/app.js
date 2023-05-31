// packages
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import http from 'http'
import https from 'https'
import fs from 'fs'
import winston from 'winston'
import expressWinston from 'express-winston'

// helpers
import globalData from './helpers/globals.js'
import * as errorHandler from './helpers/errorHandler.js'

// model
import './models/db.js'

// routes
import v1Router from './routes/v1Route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())
app.use(cors())

const newDate = new Date()
const currentDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
app.use(
    expressWinston.logger({
        transports: [new winston.transports.File({ filename: `logs/${currentDate}.log`, json: true })],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: true,
    })
)

app.use('/v1', v1Router)

app.use(errorHandler.notFound)

let server
if (!globalData.ssl || globalData.ssl === 'false') {
    server = http.createServer(app)
} else {
    const privateKey = fs.readFileSync(globalData.sslKey, 'utf8')
    const certificate = fs.readFileSync(globalData.sslCert, 'utf8')
    const credentials = { key: privateKey, cert: certificate }
    if (globalData.sslCa) {
        const caCertificate = fs.readFileSync(globalData.sslCa, 'utf8')
        credentials.ca = caCertificate
    }
    server = https.createServer(credentials, app)
}

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection error occurred -> ', err)
})

process.on('uncaughtException', (err) => {
    console.log('uncaughtException error occurred -> ', err)
})

server.listen(globalData.port, () => {
    console.log(`Server is running on port ${globalData.port}`)
})

export default app
