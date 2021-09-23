import { createConnection, Connection } from 'typeorm'
import { Employee } from '../entities/employee'

let connection: Connection

// function that returns a singelton for a database connection object
export async function getConnection() {
  if (!connection)
    connection = await createConnection({
      type: 'sqlite',
      database: './db.sqlite',
      entities: [Employee],
      // TODO: replace with migrations in production
      synchronize: true,
      logging: true
    })
  return connection
}
