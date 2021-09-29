import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { v4 } from 'uuid'
import { Check } from './check'

@Entity()
export class Employee {
  @PrimaryColumn()
  id: string = v4()

  @Column()
  name!: string

  @Column()
  firstName!: string

  @Column({ type: 'date' })
  dateCreated: Date = new Date(new Date().setHours(0, 0, 0, 0))

  @Column()
  department!: string

  // lazy loaded checks, because we don't need them always
  @OneToMany(() => Check, (check) => check.employee)
  checks?: Promise<Check[]>
}
