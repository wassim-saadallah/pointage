import { FastifyInstance } from 'fastify'
import { createEmployee, getAllEmployees, getEmployeesByDateCreated } from '../lib/employee'
import {
  EmployeeInputSchema,
  EmployeeInputType,
  EmployeeOutputSchema,
  EmployeeOutputType,
  EmployeesSchema,
  EmployeesType
} from '../schemas/employee'

export default async function (app: FastifyInstance) {
  app.post<{ Body: EmployeeInputType; Reply: EmployeeOutputType }>(
    '/employees',
    {
      schema: {
        body: EmployeeInputSchema,
        response: {
          200: EmployeeOutputSchema
        },
        tags: ['employee']
      }
    },
    async (request, _) => {
      // we can make the conversion because dates convert to strings in json
      return (await createEmployee(request.body)) as unknown as EmployeeOutputType
    }
  )

  app.get<{ Reply: EmployeesType }>(
    '/employees',
    {
      schema: {
        response: {
          200: EmployeesSchema
        },
        tags: ['employee']
      }
    },
    async () => {
      return (await getAllEmployees()) as unknown as EmployeesType
    }
  )
  app.get<{ Params: { date: string }; Reply: EmployeesType }>(
    '/employees/:date',
    {
      schema: {
        params: {
          date: { type: 'string', format: 'date' }
        },
        response: {
          200: EmployeesSchema
        },
        tags: ['employee']
      }
    },
    async (request) => {
      const dateCreated = new Date(request.params.date)
      return (await getEmployeesByDateCreated(dateCreated)) as unknown as EmployeesType
    }
  )
}
