import { formatInTimeZone } from 'date-fns-tz';
import { typesProjects } from '../constants/entities.js';

/**
 * @param {*} last_number amount of projects
 * @param {*} flag category project
 * @returns serial code project
 */
export const generateSequentialNumberProgramAndProject = (
  last_number,
  flag
) => {
  const serial = typesProjects[flag];

  const current_number = '0000000';
  const split = current_number.split('');

  const wildcard =
    last_number >= 10 && last_number < 100
      ? 2
      : last_number >= 100 && last_number < 1000
      ? 3
      : last_number >= 1000 && last_number < 10000
      ? 4
      : last_number >= 10000 && last_number < 100000
      ? 5
      : 6;

  if (last_number <= 0) {
    let withoutLast = split.pop();
    withoutLast = String(last_number + 1);
    split.push(withoutLast);
    return serial + split.join().replace(/,/g, '');
  }

  if (last_number < 10 && last_number > 0) {
    let withoutLast = split.pop();
    withoutLast = String(last_number);
    split.push(withoutLast);
    return serial + split.join().replace(/,/g, '');
  }

  if (last_number > 999999) {
    return serial + String(last_number);
  }

  let withoutLast = split.slice(0, split.length - wildcard);
  withoutLast.push(String(last_number));
  return serial + withoutLast.join().replace(/,/g, '');
};

export const getCurrentTimeZoneDate = (
  timezone = 'America/Caracas',
  format = 'yyyy-MM-dd HH:mm:ssXXX'
) => {
  const today = new Date();
  const newDate = new Date(
    formatInTimeZone(today, timezone, format)
  ).toISOString();
  return newDate;
};
