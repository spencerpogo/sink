const EPOCH = Date.parse("01 Jan 2022 00:00:00 GMT");

export function dateToTimestamp(d: Date): number {
  const ms = d.valueOf() - EPOCH;
  return Math.floor(ms / 1000);
}

export function timestampToDate(ts: number): Date {
  return new Date(ts * 1000 + EPOCH);
}
