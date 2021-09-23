import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { v4 } from 'uuid'
import { Employee } from './employee'

@Entity()
export class Check {
  @PrimaryColumn()
  id: string = v4()

  // when an employee checks in, we we create a check record
  // so the checkin date is the date of the creation
  @Column()
  checkin: Date = new Date()

  @Column()
  checkout!: Date

  @Column()
  comment!: string

  // this column stores the difference between the checkin and checkout times
  // and stores it as a timestamp difference
  @Column()
  duration!: number

  @ManyToOne(() => Employee, (employee) => employee.checks)
  employee!: Employee
}
