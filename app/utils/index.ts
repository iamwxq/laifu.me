import dayjs from "dayjs";

export function fNumber(num: number | undefined): string {
  if (!num)
    return "0";

  return num.toLocaleString("en-US");
}

export function fDatetime(dt: string | Date): string {
  return dayjs(dt).format("YYYY-MM-DD HH:mm");
}
