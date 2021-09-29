import { Employee } from '../database/entities/employee'
import { checkIn, checkOut } from '../lib/check'
import { createEmployee } from '../lib/employee'
import { EmployeeInputType } from '../schemas/employee'

let employee: Employee
const checkInDate = new Date()
const checkoutDate = new Date(checkInDate.getTime() + 8 * 3600 * 1000) // 8 hours after checkin
console.log(checkInDate, checkoutDate)

beforeAll(async () => {
  const data: EmployeeInputType = {
    name: 'Saadallah',
    firstName: 'Wassim',
    department: 'Sales'
  }
  employee = await createEmployee(data)
})

test('It should checkin an employee', async () => {
  const result = await checkIn({
    employeeId: employee.id,
    comment: 'All Good!',
    date: checkInDate.toISOString()
  })
  console.log(result)
  expect(result).toBeDefined()
  expect(result.checkin).toEqual(checkInDate)
  expect(result.checkout).toBeFalsy()
})

test('It should checkout an employee', async () => {
  const result = await checkOut(employee.id, checkoutDate)
  console.log(result)
  expect(result).toBeDefined()
  expect(result.checkout).toEqual(checkoutDate)
  expect(result.duration).toBe(8 * 3600 * 1000)
})

// TODO: add test 'it should fail checkin on missing fields'
// TODO: add test 'it should fail checkout if there is no checkin'
// TODO: add test 'it should fail checkout when employee does not exists'
