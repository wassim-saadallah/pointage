import { FastifyInstance, FastifyServerOptions } from 'fastify'

export default async function (fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.get('/', async (request, reply) => {
    options
    request
    reply
    return 'Hello World'
  })
}
