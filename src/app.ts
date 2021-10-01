import { FastifyInstance } from 'fastify'
import AutoLoad from 'fastify-autoload'
import { join } from 'path'
import fastifySwagger from 'fastify-swagger'
import { EmployeeOutputSchema } from './schemas/employee'
import fastifyCors from 'fastify-cors'

// load env variable
import dotenv from 'dotenv'
if (process.env['ENV'] === 'dev') dotenv.config({ path: './dev.env' })
else dotenv.config()

export default async function (fastify: FastifyInstance) {
  // allow CORS
  // for testing reasons we added full access
  fastify.register(fastifyCors)

  // hello world route
  fastify.get('/', (_, reply) => {
    reply.send({ Hello: 'World' })
  })

  // swagger api docuemntation
  fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'API Pointage',
        description: 'Swagger documentation for Pointage API',
        version: '0.0.1'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'employee', description: 'Employee related end-points' },
        { name: 'checkin/checkout', description: 'Checkin/Checkout related end-points' }
      ],
      definitions: {
        Employee: EmployeeOutputSchema
      }
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    staticCSP: false,
    exposeRoute: true
  })

  // require all routes in `routes` folder
  fastify.register(AutoLoad, {
    prefix: '/api',
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' }
  })
}
