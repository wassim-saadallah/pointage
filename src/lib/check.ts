import { getConnection } from '../database/config'
import { Check } from '../database/entities/check'
import { Employee } from '../database/entities/employee'
import { CheckinType } from '../schemas/check'

const getCheckRepository = async () => (await getConnection()).getRepository(Check)
// TODO make shared stuff
const getEmployeeRepository = async () => (await getConnection()).getRepository(Employee)

export async function checkIn(checkin: CheckinType): Promise<Check> {
  console.log(checkin.date)
  const checkRepository = await getCheckRepository()
  const employeeRepository = await getEmployeeRepository()
  const employee = await employeeRepository.findOne({ where: { id: checkin.employeeId } })
  if (!employee) return Promise.reject('No employee with id : ' + checkin.employeeId)
  const pointage = await checkRepository.findOne({ employee }, { order: { checkin: 'DESC' } })
  // if the employee didn't check in before he checks out, we return an error
  console.log(pointage)
  if (pointage) return Promise.reject('No checkin twice for employee with id : ' + employee.id)
  const newCheckin = checkRepository.create({
    employee,
    comment: checkin.comment,
    checkin: checkin.date ? new Date(checkin.date) : new Date()
  })
  return checkRepository.save(newCheckin)
}

export async function checkOut(employeeId: string, checkoutDate?: Date): Promise<Check> {
  console.log(checkoutDate)
  // if we don't provide a checkout date, we take the current time
  if (!checkoutDate) checkoutDate = new Date()
  const checkRepository = await getCheckRepository()
  const employeeRepository = await getEmployeeRepository()
  const employee = await employeeRepository.findOne({ where: { id: employeeId } })
  if (!employee) return Promise.reject('No employee with id : ' + employeeId)
  const checkIn = await checkRepository.findOne({ employee }, { order: { checkin: 'DESC' } })
  // if the employee didn't check in before he checks out, we return an error
  if (!checkIn) return Promise.reject('No checkin for employee with id : ' + employeeId)
  if (checkIn.checkout || checkIn.checkin.getTime() > checkoutDate.getTime())
    return Promise.reject(`Can't checkin before checkout`)

  checkIn.checkout = checkoutDate
  checkIn.duration = checkIn.checkout.getTime() - checkIn.checkin.getTime()
  return checkRepository.save(checkIn)
}
