import dayjs from "dayjs";

export function fNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function fDatetime(dt: string | Date): string {
  return dayjs(dt).format("YYYY-MM-DD HH:mm");
}
