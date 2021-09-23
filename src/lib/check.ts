import { getConnection } from '../database/config'
import { Check } from '../database/entities/check'
import { Employee } from '../database/entities/employee'

const getCheckRepository = async () => (await getConnection()).getRepository(Check)
// TODO make shared stuff
const getEmployeeRepository = async () => (await getConnection()).getRepository(Employee)

interface CheckinData {
  employeeId: string
  comment: string
  date: Date
}

export async function checkIn(checkin: CheckinData): Promise<Check> {
  // if we don't provide a checkin date, we take the current time
  if (!checkin.date) checkin.date = new Date()
  const checkRepository = await getCheckRepository()
  const employeeRepository = await getEmployeeRepository()
  const employee = await employeeRepository.findOne({ where: { id: checkin.employeeId } })
  if (!employee) return Promise.reject('No employee with id : ' + checkin.employeeId)
  const newCheckin = checkRepository.create({
    employee,
    comment: checkin.comment,
    checkin: checkin.date
  })
  return checkRepository.save(newCheckin)
}

export async function CheckOut(employeeId: string, checkoutDate?: Date): Promise<Check> {
  console.log(checkoutDate)
  // if we don't provide a checkout date, we take the current time
  if (!checkoutDate) checkoutDate = new Date()
  const checkRepository = await getCheckRepository()
  const employeeRepository = await getEmployeeRepository()
  const employee = await employeeRepository.findOne({ where: { id: employeeId } })
  if (!employee) return Promise.reject('No employee with id : ' + employeeId)
  const checkIn = await checkRepository.findOne({ employee }, { order: { checkin: 'DESC' } })
  // if the employee didn't check in before he checks out, we return an error
  if (!checkIn || checkIn.checkout)
    return Promise.reject('No checkin for employee with id : ' + employeeId)
  checkIn.checkout = checkoutDate
  checkIn.duration = checkIn.checkout.getTime() - checkIn.checkin.getTime()
  return checkRepository.save(checkIn)
}
