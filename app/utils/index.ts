import dayjs from "dayjs";

export function fNumber(num: number | undefined): string {
  if (!num)
    return "0";

  return num.toLocaleString("en-US");
}

export function fDatetime(
  dt: string | Date,
  pattern: string = "YYYY-MM-DD HH:mm",
): string {
  return dayjs(dt).format(pattern);
}

export function monthMap(m: string): string {
  switch (m) {
    case "1": return "一月";
    case "2": return "二月";
    case "3": return "三月";
    case "4": return "四月";
    case "5": return "五月";
    case "6": return "六月";
    case "7": return "七月";
    case "8": return "八月";
    case "9": return "九月";
    case "10": return "十月";
    case "11": return "十一月";
    case "12": return "十二月";
    default: throw new Error("Invalid Month");
  }
}
