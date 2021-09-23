import {
  createEmployee,
  EmployeeData,
  getAllEmployees,
  getEmployeesByDateCreated
} from '../lib/employee'

test('It should create an Employee', async () => {
  const expected: EmployeeData = {
    name: 'Saadallah',
    firstName: 'Wassim',
    department: 'Sales'
  }
  const result = await createEmployee(expected)
  expect(result).toBeDefined()
  expect(result.name).toBe(expected.name)
})

test('It should list all employees', async () => {
  const result = await getAllEmployees()
  expect(result).toBeDefined()
  expect(result).toBeInstanceOf(Array)
  expect(result.length).toBeGreaterThan(0)
  console.log(result.length, result)
})

test('It should list all employees by date created', async () => {
  const result = await getEmployeesByDateCreated(new Date())
  expect(result).toBeDefined()
  expect(result).toBeInstanceOf(Array)
  expect(result.length).toBeGreaterThan(0)
})
