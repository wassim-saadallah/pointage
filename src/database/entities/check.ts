import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { v4 } from 'uuid'
import { Employee } from './employee'

@Entity()
export class Check {
  @PrimaryColumn()
  id: string = v4()

  // when an employee checks in and doesnt provide a date
  // we persume that it is the current time
  @Column()
  checkin!: Date;

  @Column({ nullable: true })
  checkout!: Date

  @Column({ nullable: true })
  comment!: string

  // this column stores the difference between the checkin and checkout times
  // and stores it as a timestamp difference
  @Column({ nullable: true })
  duration!: number

  // lazy loaded
  @ManyToOne(() => Employee, (employee) => employee.checks)
  employee!: Employee
}
