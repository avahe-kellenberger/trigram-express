import * as pgPromise from 'pg-promise'
import * as osm from './osm'

import { IMain, IDatabase, TConfig } from 'pg-promise'

export class DatabaseTableConnection {
  public readonly tableName: string
  private readonly database: IDatabase<any>
  private readonly pgp: IMain

  constructor(tableName: string) {
    this.tableName = tableName
    this.pgp = pgPromise()
    const databaseConfig: TConfig = {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT!),
      database: process.env.PGDATABASE
    }
    this.database = this.pgp(databaseConfig)
  }

  public insert(entry: osm.trigramentry): Promise<osm.trigramentry[]> {
    return this.database.query(
      `INSERT INTO ${this.tableName} (filename, content) VALUES ('${entry.filename}', '${entry.content}') RETURNING id`
    )
  }

  public query(query: string): Promise<osm.trigramentry[]> {
    return this.database.query(query)
  }

  public each(query: string, callback: (entry: any) => void): void {
    this.database.each(query, [], callback).catch(error => {
      console.error(`Error connecting to database: ${error}`)
    })
  }

  public getEntryByID(id: number): Promise<osm.trigramentry[]> {
    return this.database.query(`SELECT content FROM ${this.tableName} WHERE id = ${id}`)
  }
}
