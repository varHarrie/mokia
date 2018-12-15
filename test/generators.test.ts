import { expect } from 'chai'
import { mock } from '../src'

describe('generator:generate', () => {

  it('generate(not object)', () => {
    const r = mock.generate(5)

    expect(r).to.equal(5)
  })

  it('generate({})', () => {
    const r = mock.generate({})

    expect(r).to.deep.equal({})
  })

  it('generate(instance)', () => {
    // tslint:disable-next-line:only-arrow-functions
    const Test: any = function () {/* */}
    Test.prototype.foo = true

    const r = mock.generate(new Test())
    expect(r).to.deep.equal({})
  })

  it('generate(object)', () => {
    const r = mock.generate({ name: 'Harrie', age: 18 })

    expect(r).to.deep.equal({ name: 'Harrie', age: 18 })
  })

  it('generate(dynamic object)', () => {
    const r = mock.generate({ name: mock.string('abc'), age: mock.natural(0, 100) })

    expect(r).to.have.property('name').is.a('string')
    expect(r).to.have.property('age').is.a('number').within(0, 100)
  })

  it('generate(function)', () => {
    const r = mock.generate(() => 'Harrie')

    expect(r).to.equal('Harrie')
  })

})

describe('generator:boolean', () => {

  it('boolean()', () => {
    const r = mock.boolean()

    expect(r).is.a('boolean')
  })

  it('boolean(1)', () => {
    const r = mock.boolean(1)

    expect(r).to.equal(true)
  })

  it('boolean(0, false)', () => {
    const r = mock.boolean(0, false)

    expect(r).to.equal(true)
  })

})

describe('generator:integer', () => {

  it('integer()', () => {
    const r = mock.integer()
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').equal(i)
  })

  it('integer(float)', () => {
    const r = mock.integer(5.8)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').most(5).equal(i)
  })

  it('integer(max)', () => {
    const r = mock.integer(10)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').most(10).equal(i)
  })

  it('integer(min, max)', () => {
    const r = mock.integer(10, 20)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').within(10, 20).equal(i)
  })

})

describe('generator:natural', () => {

  it('natural()', () => {
    const r = mock.natural()
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').least(0).equal(i)
  })

  it('natural(negative)', () => {
    const r = mock.natural(-10)

    expect(r).is.an('number').equal(0)
  })

  it('natural(max)', () => {
    const r = mock.natural(10)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').within(0, 10).equal(i)
  })

  it('natural(min, max)', () => {
    const r = mock.natural(10, 20)
    const i = parseInt(r as any, 10)

    expect(r).is.an('number').within(10, 20).equal(i)
  })

})

describe('generator:float', () => {

  it('float()', () => {
    const r = mock.float()
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(0, 101)
    expect(i).has.length.least(1)
    expect(f).has.length.within(1, 3)
  })

  it('float(max)', () => {
    const r = mock.float(10)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(0, 11)
    expect(i).has.length.least(1)
    expect(f).has.length.within(1, 3)
  })

  it('float(min, max)', () => {
    const r = mock.float(5, 10)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 11)
    expect(i).has.length.least(1)
    expect(f).has.length.within(1, 3)
  })

  it('float(min, max, fixed)', () => {
    const r = mock.float(5, 10, 3)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 11)
    expect(i).has.length.least(1)
    expect(f).has.lengthOf(3)
  })

  it('float(min, max, 0)', () => {
    const r = mock.float(5, 10, 0)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 10)
    expect(i).has.length.least(1)
    expect(f).to.equal(undefined)
  })

  it('float(min, max, dmin, dmax)', () => {
    const r = mock.float(5, 10, 3, 5)
    const [i, f] = r.toString().split('.')

    expect(r).is.an('number').within(5, 11)
    expect(i).has.length.least(1)
    expect(f).has.length.within(3, 5)
  })

})

describe('generator:char', () => {

  it('char(pool)', () => {
    const r = mock.char('abc')

    expect(r).is.a('string').match(/[abc]/)
  })

})

describe('generator:string', () => {

  it('string(pool)', () => {
    const r = mock.string('abc')

    expect(r).is.a('string').match(/^[abc]+$/)
  })

  it('string(pool, length)', () => {
    const r = mock.string('abc', 10)

    expect(r).is.a('string').match(/^[abc]{10}$/)
  })

  it('string(pool, min, max)', () => {
    const r = mock.string('abc', 5, 10)

    expect(r).is.a('string').match(/^[abc]{5,10}$/)
  })

})

describe('generator:word', () => {

  it('word()', () => {
    const r = mock.word()

    expect(r).is.a('string').match(/^[a-z]{1,8}$/)
  })

  it('word(length)', () => {
    const r = mock.word(6)

    expect(r).is.a('string').match(/^[a-z]{6}$/)
  })

  it('word(min, max)', () => {
    const r = mock.word(3, 5)

    expect(r).is.a('string').match(/^[a-z]{3,5}$/)
  })

})

describe('generator:title', () => {

  it('title()', () => {
    const r = mock.title()
    const s = r.split(' ')

    expect(r).is.a('string').match(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/)
    expect(s).has.length.within(1, 5)
  })

  it('title(length)', () => {
    const r = mock.title(6)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/)
    expect(s).has.lengthOf(6)
  })

  it('title(min, max)', () => {
    const r = mock.title(3, 5)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/)
    expect(s).has.length.within(3, 5)
  })

})

describe('generator:sentence', () => {

  it('sentence()', () => {
    const r = mock.sentence()
    const s = r.split(' ')

    expect(r).is.a('string').match(/^[A-Z][^.]*\.$/)
    expect(s).has.length.within(5, 15)
  })

  it('sentence(length)', () => {
    const r = mock.sentence(5)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^[A-Z][^.]*\.$/)
    expect(s).has.lengthOf(5)
  })

  it('sentence(min, max)', () => {
    const r = mock.sentence(2, 3)
    const s = r.split(' ')

    expect(r).is.a('string').match(/^[A-Z][^.]*\.$/)
    expect(s).has.length.within(2, 3)
  })

})

describe('generator:paragraph', () => {

  it('paragraph()', () => {
    const r = mock.paragraph()
    const s = r.split('. ')

    expect(r).is.a('string').match(/^[A-Z].*\.$/)
    expect(s).has.length.within(2, 5)
  })

  it('paragraph(length)', () => {
    const r = mock.paragraph(3)
    const s = r.split('. ')

    expect(r).is.a('string').match(/^[A-Z].*\.$/)
    expect(s).has.lengthOf(3)
  })

  it('paragraph(min, max)', () => {
    const r = mock.paragraph(3, 5)
    const s = r.split('. ')

    expect(r).is.a('string').match(/^[A-Z].*\.$/)
    expect(s).has.length.within(3, 5)
  })

})

describe('generator:passage', () => {

  it('passage()', () => {
    const r = mock.passage()
    const s = r.split('\n')

    expect(r).is.a('string').match(/^[A-Z].*\.$/m)
    expect(s).has.length.within(2, 5)
  })

  it('passage(length)', () => {
    const r = mock.passage(3)
    const s = r.split('\n')

    expect(r).is.a('string').match(/^[A-Z].*\.$/m)
    expect(s).has.lengthOf(3)
  })

  it('passage(min, max)', () => {
    const r = mock.passage(3, 5)
    const s = r.split('\n')

    expect(r).is.a('string').match(/^[A-Z].*\.$/m)
    expect(s).has.length.within(3, 5)
  })

})

describe('generator:datetime', () => {

  it('datetime()', () => {
    const r = mock.datetime()

    expect(r).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/)
  })

  it('datetime(format)', () => {
    const r = mock.datetime('DD/MM/YY')

    expect(r).to.match(/^\d{2}\/\d{2}\/\d{2}$/)
  })

  it('datetime(format, max)', () => {
    const r = mock.datetime('YYYY-MM-DD HH:mm:ss', '1970-01-01 09:00:00')
    const d = new Date(r)

    expect(r).is.a('string')
    expect(d).within(new Date(0), new Date('1970-01-01 09:00:00'))
  })

  it('datetime(format, min, max)', () => {
    const r = mock.datetime('YYYY-MM-DD HH:mm:ss', '2000-01-01 00:00:00', '2000-01-01 2:00:00')
    const d = new Date(r)

    expect(r).is.a('string')
    expect(d).within(new Date('2000-01-01 00:00:00'), new Date('2000-01-01 2:00:00'))
  })

})

describe('generator:date', () => {

  it('date()', () => {
    const r = mock.date()

    expect(r).to.match(/^\d{4}-\d{2}-\d{2}$/)
  })

})

describe('generator:time', () => {

  it('time()', () => {
    const r = mock.time()

    expect(r).to.match(/^\d{2}:\d{2}:\d{2}$/)
  })

})

describe('generator:now', () => {

  it('now()', () => {
    const r = mock.now()

    expect(r).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/)
  })

  it('now(format)', () => {
    const r = mock.now('HH:mm:ss')

    expect(r).to.match(/^\d{2}:\d{2}:\d{2}$/)
  })

})

describe('generator:image', () => {

  it('image()', () => {
    const r = mock.image()

    expect(r).is.a('string')
  })

})

describe('generator:dataImage', () => {

  it('dataImage()', () => {
    const r = mock.dataImage()

    expect(r).is.a('string').satisfy((rr: string) => rr.startsWith('data:image/'))
  })

})

describe('generator:array', () => {

  it('array(proto)', () => {
    const r = mock.array({})

    expect(r).is.an('array').with.length.within(2, 5)
  })

  it('array(function)', () => {
    const r = mock.array(() => 'foo')

    expect(r).is.an('array').with.length.within(2, 5)
    expect(r).to.include.members(['foo'])
  })

  it('array(proto, length)', () => {
    const r = mock.array({}, 3)

    expect(r).is.an('array').with.lengthOf(3)
  })

  it('array(proto, min, max)', () => {
    const r = mock.array({}, 3, 5)

    expect(r).is.an('array').with.length.within(3, 5)
  })

})

describe('generator:oneOf', () => {

  it('oneOf(list)', () => {
    const r = mock.oneOf(['a', 'b', 'c'])

    expect(r).is.oneOf(['a', 'b', 'c'])
  })

})

describe('generator:manyOf', () => {

  it('manyOf(list)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f']
    const r = mock.manyOf(list)

    expect(r).is.an('array').with.length.within(0, list.length)
    expect(r).to.satisfy((rr: any[]) => rr.every((i) => list.includes(i)))
  })

  it('manyOf(list, length)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f']
    const r = mock.manyOf(list, 2)

    expect(r).is.an('array').with.lengthOf(2)
    expect(r).to.satisfy((rr: any[]) => rr.every((i) => list.includes(i)))
  })

  it('manyOf(list, min, max)', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f']
    const r = mock.manyOf(list, 1, 2)

    expect(r).is.an('array').with.length.within(1, 2)
    expect(r).to.satisfy((rr: any[]) => rr.every((i) => list.includes(i)))
  })

})

describe('generator:pick', () => {

  it('pick(proto)', () => {
    const r = mock.pick(null)

    expect(r).to.equal(null)
  })

  it('pick(proto, length)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const keys = Object.keys(obj)
    const r = mock.pick(obj, 2)
    const k = Object.keys(r)

    expect(r).is.an('object')
    expect(k).have.lengthOf(2)
    expect(k).to.satisfy((kk: any[]) => kk.every((i) => keys.includes(i)))
  })

  it('pick(proto, props)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const r = mock.pick(obj, 'a b')
    const k = Object.keys(r)

    expect(r).is.an('object')
    expect(k).to.deep.equal(['a', 'b'])
  })

  it('pick(proto, min, max)', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const keys = Object.keys(obj)
    const r = mock.pick(obj, 2, 3)
    const k = Object.keys(r)

    expect(r).is.an('object')
    expect(k).have.length.within(2, 3)
    expect(k).to.satisfy((kk: any[]) => kk.every((i) => keys.includes(i)))
  })

})
