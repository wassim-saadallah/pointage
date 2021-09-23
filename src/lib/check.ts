import { getConnection } from '../database/config'
import { Check } from '../entities/check'
import { Employee } from '../entities/employee'

const getCheckRepository = async () => (await getConnection()).getRepository(Check)
// TODO make shared stuff
const getEmployeeRepository = async () => (await getConnection()).getRepository(Employee)

interface CheckinData {
  employeeId: string
  comment: string
}

export async function checkIn(checkin: CheckinData): Promise<Check> {
  const checkRepository = await getCheckRepository()
  const employeeRepository = await getEmployeeRepository()
  const employee = await employeeRepository.findOne({ where: { id: checkin.employeeId } })
  if (!employee) return Promise.reject('No employee with id : ' + checkin.employeeId)
  const newCheckin = checkRepository.create({ employee, comment: checkin.comment })
  return checkRepository.save(newCheckin)
}

export async function CheckOut(employeeId: string): Promise<Check> {
  const checkRepository = await getCheckRepository()
  const employeeRepository = await getEmployeeRepository()
  const employee = await employeeRepository.findOne({ where: { id: employeeId } })
  if (!employee) return Promise.reject('No employee with id : ' + employeeId)
  const checkIn = await checkRepository.findOne({ employee }, { order: { checkin: 'DESC' } })
  // if the employee didn't check in before he checked out, we return an error
  if (!checkIn || checkIn.checkout)
    return Promise.reject('No checkin for employee with id : ' + employeeId)
  checkIn.checkout = new Date()
  checkIn.duration = checkIn.checkout.getTime() - checkIn.checkin.getTime()
  return checkRepository.save(checkIn)
}
