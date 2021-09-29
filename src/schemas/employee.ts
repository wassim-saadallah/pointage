import { Static, Type } from '@sinclair/typebox'

export const EmployeeInputSchema = Type.Object({
  name: Type.String(),
  firstName: Type.String(),
  department: Type.String()
})

export const EmployeeOutputSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  firstName: Type.String(),
  department: Type.String(),
  dateCreated: Type.String({ format: 'date' })
})

export const EmployeesSchema = Type.Array(EmployeeOutputSchema)

export type EmployeeInputType = Static<typeof EmployeeInputSchema>
export type EmployeeOutputType = Static<typeof EmployeeOutputSchema>
export type EmployeesType = EmployeeOutputType[]
