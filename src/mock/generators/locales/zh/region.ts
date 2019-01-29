import regions, { Region } from './constant-regions'
import { oneOf } from '../../complex'
import { integer } from '../../basic'

/**
 * Returns a province
 *
 * @example
 * province()
 * // => { code: '440000', name: '广东省' }
 */
export function province (): Region {
  const { code, name } = oneOf(regions)
  return { code, name }
}

/**
 * Returns a province name
 *
 * @example
 * provinceName()
 * // => '广东省'
 */
export function provinceName (): string {
  return province().name
}

/**
 * Returns a city
 *
 * @example
 * city()
 * // => { code: '440100', name: '广州市' }
 */
export function city (): Region {
  let p = oneOf(regions)

  while (!p.children) {
    p = oneOf(regions)
  }

  const { code, name } = oneOf(p.children)
  return { code, name }
}

/**
 * Returns a city name
 *
 * @example
 * cityName()
 * // => '广州市'
 */
export function cityName (): string {
  return city().name
}

/**
 * Returns a county
 *
 * @example
 * county()
 * // => { code: '440105', name: '海珠区' }
 */
export function county (): Region {
  let p = oneOf(regions)

  while (!p.children) {
    p = oneOf(regions)
  }

  const { code, name } = oneOf(oneOf(p.children).children!)
  return { code, name }
}

/**
 * Returns a county name
 *
 * @example
 * countyName()
 * // => '海珠区'
 */
export function countyName (): string {
  return county().name
}

/**
 * Returns a region
 *
 * @example
 * region()
 * // => [
 *         { code: '440000', name: '广东省' },
 *         { code: '440100', name: '广州市' },
 *         { code: '440105', name: '海珠区' }
 *       ]
 */
export function region (): Region[] {
  const regionList: Region[] = []

  const { children: children1, ...region1 } = oneOf(regions)
  regionList.push(region1)

  if (!children1) return regionList

  const { children: children2, ...region2 } = oneOf(children1)
  regionList.push(region2)

  if (!children2) return regionList

  const region3 = oneOf(children2)
  regionList.push(region3)

  return regionList
}

/**
 * Returns a region name
 *
 * @example
 * regionName()
 * // => '广东省 广州市 海珠区'
 */
export function regionName (): string {
  return region().map((r) => r.name).join(' ')
}

/**
 * Returns a zip code
 *
 * @example
 * zip()
 * // => '159041'
 */
export function zipCode (): string {
  return Array.from({ length: 6 }).map(() => integer(0, 9)).join('')
}
