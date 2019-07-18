import * as osm from './osm'
import app from './app'
import { DatabaseTableConnection } from './database-connection'
import multer = require('multer')
import { RequestHandlerParams } from 'express-serve-static-core'
import { Server } from 'http'
require('dotenv').config()

export class EndpointListener {
  private readonly dbConnection: DatabaseTableConnection = new DatabaseTableConnection('trigramentry')
  private readonly upload = multer()

  constructor() {
    app.post('/upload', this.upload.single('file'), this.handleUpload)
  }

  public listen(port: number, callback?: () => void): Server {
    return app.listen(port, callback)
  }

  private readonly handleUpload: RequestHandlerParams = (request, response) => {
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
}
