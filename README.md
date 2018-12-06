```ts
import mock from 'mokia'

mock({ name: 'Harrie', age: 18 })

mock({ name: mock.cname(2, 4), age: mock.integer(1, 100) })

mock({
  name: mock.cname(2, 4),
  age: mock.integer(1, 100),
  friends: mock.array({
    name: mock.cname(2, 4),
    age: mock.integer(1, 100),
  }, 0, 5)
})

class Person {

  @m.cname(2, 4)
  name: string

  @m.integer(1, 100)
  age: number

}

mock(Person, {friends: mock.array(Person, 0, 5)})

class Person {

  @m.cname(2, 4)
  name: string

  @m.integer(1, 100)
  age: number

  @m.array(Person, 0, 5)
  friends: Person[]

}

mock(Person, {friends: mock.array(mock.mixin(Person, 'name'))}})
```
