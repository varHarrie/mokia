import { decorators } from '../src'

export class Person {

  @decorators.string('lower', 5, 10)
  public name: string

  @decorators.integer(0, 100)
  public age: number

  public canFly: boolean = false

}

export class Superman extends Person {

  @decorators.integer(80, 100)
  public power: number

  public canFly: boolean = true

}
