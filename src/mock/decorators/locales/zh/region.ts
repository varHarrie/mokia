import * as generators from '../../../generators/locales/zh'
import { createDecorator } from '../../../invoker'

export function province (): PropertyDecorator {
  return createDecorator(generators.province, [])
}

export function provinceName (): PropertyDecorator {
  return createDecorator(generators.provinceName, [])
}

export function city (): PropertyDecorator {
  return createDecorator(generators.city, [])
}

export function cityName (): PropertyDecorator {
  return createDecorator(generators.cityName, [])
}

export function county (): PropertyDecorator {
  return createDecorator(generators.county, [])
}

export function countyName (): PropertyDecorator {
  return createDecorator(generators.countyName, [])
}

export function region (): PropertyDecorator {
  return createDecorator(generators.region, [])
}

export function regionName (): PropertyDecorator {
  return createDecorator(generators.regionName, [])
}

export function zipCode (): PropertyDecorator {
  return createDecorator(generators.zipCode, [])
}
