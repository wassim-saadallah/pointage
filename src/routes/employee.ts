import { FastifyInstance } from 'fastify'
import { createEmployee, getAllEmployees, getEmployeesByDateCreated } from '../lib/employee'
import {
  EmployeeInputType,
  EmployeeOutputType,
  EmployeeSchema,
  EmployeesSchema,
  EmployeesType
} from '../schemas/employee'

export default async function (app: FastifyInstance) {
  app.post<{ Body: EmployeeInputType; Reply: EmployeeOutputType }>(
    '/employees',
    {
      schema: {
        body: EmployeeSchema,
        response: {
          200: EmployeeSchema
        }
      }
    },
    async (request, _) => {
      // we can make the conversion because we validate our input
      return (await createEmployee(request.body)) as EmployeeOutputType
    }
  )

  app.get<{ Reply: EmployeesType }>(
    '/employees',
    {
      schema: {
        response: {
          200: EmployeesSchema
        }
      }
    },
    async () => {
      // TODO: change this type assertion
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
        }
      }
    },
    async (request) => {
      // TODO: change this type assertion
      const dateCreated = new Date(request.params.date)
      return (await getEmployeesByDateCreated(dateCreated)) as unknown as EmployeesType
    }
  )
}
