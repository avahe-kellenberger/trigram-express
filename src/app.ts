import { Application } from 'express'

const express = require('express')
const bodyParser = require('body-parser')
const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

export default app
