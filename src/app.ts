import { Application } from 'express'

const express = require('express')
const bodyParser = require('body-parser')
const app: Application = express()
const multer = require('multer')
const upload = multer()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

export default app
