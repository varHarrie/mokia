import { char, string } from '../basic';
import { oneOf } from '../complex';
import { birthday } from '../person';
import { NUMBERS, POSITIVE_NUMBERS } from '../constants';
import { FIRST_NAMES, LAST_NAMES, PHONE_PREFIX } from './constants';

/**
 * Returns a first name.
 */
export function firstName(): string {
  return oneOf(FIRST_NAMES);
}

/**
 * Returns a first name.
 */
export function lastName(): string {
  return oneOf(LAST_NAMES);
}

/**
 * Returns a full name.
 */
export function fullName(): string {
  return firstName() + lastName();
}

/**
 * Returns a phone number.
 */
export function phoneNumber(): string {
  return oneOf(PHONE_PREFIX) + string(NUMBERS, 8);
}

/**
 * Returns an id number.
 */
export function idNumber(): string {
  const prefix = char(POSITIVE_NUMBERS) + string(NUMBERS, 5);
  const suffix = string(NUMBERS, 3) + char('0123456789x');

  return prefix + birthday('YYYYMMDD') + suffix;
}
