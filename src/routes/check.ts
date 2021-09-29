import { FastifyInstance } from 'fastify'
import { checkIn, checkOut } from '../lib/check'
import {
  CheckinSchema,
  CheckinType,
  CheckoutSchema,
  CheckoutType,
  CheckSchema,
  CheckType
} from '../schemas/check'

export default async function (app: FastifyInstance) {
  app.post<{ Body: CheckinType; Reply: CheckType }>(
    '/checkin',
    {
      schema: {
        body: CheckinSchema,
        response: {
          200: CheckSchema
        },
        tags: ['checkin/checkout']
      }
    },
    async (request, _) => {
      const { employee, ...rest } = await checkIn(request.body)
      // we cast the date types to string because the json response will transform
      // dates to strings anyway
      return { ...rest, employeeId: employee.id } as any as CheckType
    }
  )

  app.get<{ Querystring: CheckoutType; Reply: CheckType }>(
    '/checkout',
    {
      schema: {
        querystring: CheckoutSchema,
        response: {
          200: CheckSchema
        },
        tags: ['checkin/checkout']
      }
    },
    async (request, _) => {
      console.log(request.query)
      return (await checkOut(request.query.employeeId)) as any as CheckType
    }
  )
}
