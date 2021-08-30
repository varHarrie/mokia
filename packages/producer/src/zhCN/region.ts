import { oneOf } from '../complex';
import regions from './regions.json';

type Region = { code: string; name: string; children?: Region[] };

/**
 * Returns a province object
 */
export function province(): Region {
  const { code, name } = oneOf(regions);
  return { code, name };
}

/**
 * Returns a province name
 */
export function provinceName(): string {
  return province().name;
}

/**
 * Returns a city object
 */
export function city(): Region {
  let p = oneOf(regions);

  // There are no cities under the special administrative region
  while (!p.children) p = oneOf(regions);

  // Be a province-level city if level is 1
  const { code, name } = p.level === 1 ? p : oneOf(p.children);
  return { code, name };
}

/**
 * Returns a city name
 */
export function cityName(): string {
  return city().name;
}

/**
 * Returns a county object
 */
export function county(): Region {
  let p = oneOf(regions);

  // There are no cities under the special administrative region
  while (!p.children) p = oneOf(regions);

  let c = oneOf(p.children);
  while (c.children) c = oneOf(c.children);

  const { code, name } = c;
  return { code, name };
}

/**
 * Returns a county name
 */
export function countyName(): string {
  return county().name;
}

/**
 * Returns a detailed region
 */
export function region(): Region[] {
  const list: Region[] = [];
  let children: Region[] | undefined = regions;

  while (children?.length) {
    const r: Region = oneOf(children);
    list.push({ code: r.code, name: r.name });
    children = r.children;
  }

  return list;
}

/**
 * Returns a detailed region name
 */
export function regionName(separator?: string): string {
  return region()
    .map((r) => r.name)
    .join(separator ?? '');
}
