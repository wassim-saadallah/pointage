import { Equal } from 'typeorm'
import { getConnection } from '../database/config'
import { Employee } from '../database/entities/employee'
import { EmployeeInputType } from '../schemas/employee'

const getEmployeeRepository = async () => (await getConnection()).getRepository(Employee)
/**
 * Converts a JS date to a format that sqlite understands, so we can make operation on them
 *
 * see `getEmployeesByDateCreated`
 */
const dateToSqliteDate = (date: Date): string =>
  date.toISOString().replace('T', ' ').replace('Z', '')


export async function createEmployee(employee: EmployeeInputType): Promise<Employee> {
  const repository = await getEmployeeRepository()
  const newEmployee = repository.create(employee)
  return repository.save(newEmployee)
}

export async function getAllEmployees(): Promise<Employee[]> {
  const repository = await getEmployeeRepository()
  return repository.find()
}

// TODO: maybe we can use a generic function
/**
 * Returns the list of employees that are created in the day of `dateCreated`.
 *
 * We only use the day, month and year per specification
 */
export async function getEmployeesByDateCreated(dateCreated: Date): Promise<Employee[]> {
  dateCreated = new Date(dateCreated.setHours(0, 0, 0, 0)) // round to nearest day
  console.log(dateCreated)
  const repository = await getEmployeeRepository()
  return repository.find({
    where: {
      dateCreated: Equal(dateToSqliteDate(dateCreated)) // format date to database date
    }
  })
}
