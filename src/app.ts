import { FastifyInstance } from 'fastify'
import AutoLoad from 'fastify-autoload'
import { join } from 'path'

export default async function (fastify: FastifyInstance) {
  // hello world route
  fastify.get('/', (_, reply) => {
    reply.send({ Hello: 'World' })
  })
  // require all routes in `routes` folder
  fastify.register(AutoLoad, { dir: join(__dirname, 'routes') })
}
