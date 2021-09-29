import { Static, Type } from '@sinclair/typebox'

export const CheckSchema = Type.Object({
  id: Type.String(),
  checkin: Type.String(),
  checkout: Type.String(),
  comment: Type.String(),
  employeeId: Type.String()
})

export const CheckinSchema = Type.Object({
  employeeId: Type.String({ format: 'uuid' }),
  comment: Type.String(),
  date: Type.Optional(Type.String({ format: 'date-time' }))
})

export const CheckoutSchema = Type.Object({
  employeeId: Type.String({ format: 'uuid' })
})

export type CheckType = Static<typeof CheckSchema>
export type CheckinType = Static<typeof CheckinSchema>
export type CheckoutType = Static<typeof CheckoutSchema>
