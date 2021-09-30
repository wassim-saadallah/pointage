/**
 * Test scenario:
 * - Create Employee 1 : POST /employee -> Employee 1 created
 * - Create Employee 2 : POST /employee -> Employee 2 created
 * - List Employees    : GET  /employee -> [Employee 1, Employee 2]
 *
 * - Checkin Employee 1  : POST /checkin  -> Checkin Employee 1
 * - Checkin Employee 1  : POST /checkin  -> Error (to be verified)
 * - Checkout Employee 1 : GET  /checkout -> Checkout Employee 2
 * - Checkout Employee 1 : GET  /checkout -> Error
 */

import axios, { AxiosResponse } from 'axios'
import { CheckinType, CheckType } from '../schemas/check'
import { EmployeeInputType, EmployeeOutputType, EmployeesType } from '../schemas/employee'

const BASE_URL = 'http://localhost:3000/api'

const employee1Data: EmployeeInputType = {
  department: 'Engineering',
  firstName: 'Employee1',
  name: 'Employee1'
}
let employee1Id = ''

const employee2Data: EmployeeInputType = {
  department: 'Engineering',
  firstName: 'Employee2',
  name: 'Employee2'
}

// helper functions
const postApi = async <B, R>(resource: string, body: B): Promise<R> => {
  return (await axios.post<B, AxiosResponse<R>>(BASE_URL + resource, body)).data
}

const getApi = async <R>(resource: string): Promise<R> => {
  return (await axios.get<any, AxiosResponse<R>>(BASE_URL + resource)).data
}

test('It should create an employee', async () => {
  const employee = await postApi<EmployeeInputType, EmployeeOutputType>('/employees', employee1Data)
  console.log(employee)
  expect(employee).toBeDefined()
  expect(employee.firstName).toBe('Employee1')
  employee1Id = employee.id
})

test('It should create an employee', async () => {
  const employee = await postApi<EmployeeInputType, EmployeeOutputType>('/employees', employee2Data)
  console.log(employee)
  expect(employee).toBeDefined()
  expect(employee.firstName).toBe('Employee2')
})

test('It should list all employees', async () => {
  const employees = await getApi<EmployeesType>('/employees')
  expect(employees).toBeDefined()
  expect(employees.length).toBeGreaterThanOrEqual(2)
})

test('It should checkin employee 1', async () => {
  if (employee1Id === '') fail('no employee id')
  const checkinInput: CheckinType = {
    comment: 'comment',
    employeeId: employee1Id
  }
  const pointage = await postApi<CheckinType, CheckType>('/checkin', checkinInput)
  expect(pointage).toBeDefined()
  expect(pointage.checkin).toBeDefined()
})

test('It should not checkin employee 1 a second time', async () => {
  if (employee1Id === '') fail('no employee id')
  const checkinInput: CheckinType = {
    comment: 'comment',
    employeeId: employee1Id
  }
  const pointage = postApi<CheckinType, CheckType>('/checkin', checkinInput)
  expect(pointage).rejects.toBeDefined()
})

test('It should checkout employee 1', async () => {
  if (employee1Id === '') fail('no employee id')
  const pointage = await getApi<CheckType>('/checkout?employeeId=' + employee1Id)
  expect(pointage).toBeDefined()
  expect(pointage.checkout).toBeDefined()
})

test('It should not checkout employee 1 a second time', async () => {
  if (employee1Id === '') fail('no employee id')
  const pointage = getApi<CheckType>('/checkout?employeeId=' + employee1Id)
  expect(pointage).rejects.toBeDefined()
})
