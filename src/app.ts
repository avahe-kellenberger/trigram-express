import { Application } from 'express'

// Configure environment variables
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

export default app
