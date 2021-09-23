import { Static, Type } from '@sinclair/typebox'

export const EmployeeSchema = Type.Object({
  name: Type.String(),
  firstName: Type.String(),
  department: Type.String(),
  dateCreated: Type.Optional(Type.String({ format: 'date' })) // date
})

export const EmployeesSchema = Type.Array(EmployeeSchema)

export type EmployeeInputType = Static<typeof EmployeeSchema>
export type EmployeeOutputType = Static<typeof EmployeeSchema> & { id: string; dateCreated: Date }
export type EmployeesType = EmployeeOutputType[]
