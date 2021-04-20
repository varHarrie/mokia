/**
 * Returns an uuid string
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let AUTO_INCREMENT_ID = 0;

/**
 * Returns an auto increment id
 */
export function increment(step?: number): number {
  AUTO_INCREMENT_ID += step ?? 1;
  return AUTO_INCREMENT_ID;
}
