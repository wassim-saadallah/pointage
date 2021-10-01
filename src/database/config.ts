import 'reflect-metadata'

import { createConnection, Connection } from 'typeorm'
import { Employee } from './entities/employee'
import { Check } from './entities/check'

let connection: Connection

// function that returns a singelton for a database connection object
export async function getConnection() {
  if (!connection)
    connection = await createConnection({
      type: 'sqlite',
      database: process.env['DATABASE_FILE'] as string,
      entities: [Employee, Check],
      synchronize: true,
      logging: true,
      logger: 'file'
    })
  return connection
}
