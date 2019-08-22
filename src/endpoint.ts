import * as osm from './osm'
import app from './app'

import { DatabaseTableConnection } from './database-connection'
import { RequestHandlerParams } from 'express-serve-static-core'
import { Server } from 'http'
import { TrigramGenerator } from './trigram-generator'

import multer = require('multer')

export class EndpointListener {
  private readonly dbConnection: DatabaseTableConnection = new DatabaseTableConnection('trigramentry')
  private readonly upload = multer()

  constructor() {
    app.post('/upload', this.upload.single('file'), this.handleUpload)
    app.get('/texts', this.getUploadedTexts)
    app.get('/texts/:id', this.getText)
    app.get('/texts/:id/generate', this.generateText)
  }

  public listen(port: number, callback?: () => void): Server {
    return app.listen(port, callback)
  }

  private readonly handleUpload: RequestHandlerParams = (request: any, response: any) => {
    const filename: string | undefined = request.file.originalname
    if (filename == null || !filename.endsWith('.txt')) {
      response.status(400).send('File name must end with .txt')
    } else {
      const fileContents: string = request.file.buffer.toString()
      const entry: osm.trigramentry = {
        // Placeholder - ids are automatically created in the database.
        id: 0,
        filename: filename,
        content: fileContents
      }

      // Upload file to database
      this.dbConnection
        .insert(entry)
        .then((entries: osm.trigramentry[]) => {
          const id: number = entries.length > 0 ? entries[0].id : -1
          response.send({ id: id, status: 200 })
        })
        .catch(reason => {
          response.send({ status: 400, error: reason })
        })
    }
  }

  private readonly getUploadedTexts: RequestHandlerParams = (_: any, response: any) => {
    this.dbConnection
      .query(`SELECT id, filename FROM ${this.dbConnection.tableName}`)
      .then(entries => {
        response.send({ status: 200, texts: entries })
      })
      .catch(reason => {
        response.send({ status: 400, error: reason })
      })
  }

  private readonly getText: RequestHandlerParams = (request: any, response: any) => {
    const id: number = parseInt(request.params.id)
    if (isNaN(id)) {
      response.send({ status: 400, error: `Invalid ID` })
      return
    }
    this.dbConnection
      .getEntryByID(id)
      .then(entries => {
        if (entries.length < 1) {
          response.send({ status: 400, error: `Text with id ${id} not found` })
        } else {
          response.send({ status: 200, texts: entries })
        }
      })
      .catch(reason => {
        response.send({ status: 400, error: reason })
      })
  }

  private readonly generateText: RequestHandlerParams = (request: any, response: any) => {
    const id: number = parseInt(request.params.id)
    if (isNaN(id)) {
      response.send({ status: 400, error: `Invalid ID` })
      return
    }

    const maxWords: number | undefined = request.query.maxWords == null ? undefined : parseInt(request.query.maxWords)
    if (maxWords !== undefined && isNaN(maxWords)) {
      response.send({ status: 400, error: `Invalid maximum word count` })
      return
    }

    const seedWords: string[] | undefined =
      request.query.seedWords == null ? undefined : request.query.seedWords.split(',')
    if (seedWords != null && seedWords.length !== 2) {
      response.send({ status: 400, error: `Must only be two seed words separated by commas` })
      return
    }

    this.dbConnection
      .getEntryByID(id)
      .then(entries => {
        if (entries.length < 1) {
          response.send({ status: 400, error: `Text with id ${id} not found` })
        } else {
          const text: string = entries[0].content
          const trigramGenerator: TrigramGenerator = new TrigramGenerator(text)
          const generated: string = trigramGenerator.generateRandomText(seedWords, maxWords)
          response.send({ status: 200, generated: generated })
        }
      })
      .catch(reason => {
        response.send({ status: 400, error: reason })
      })
  }
}
