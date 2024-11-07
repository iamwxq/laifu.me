import type { BinaryLike } from "node:crypto";
import crypto from "node:crypto";
import fs from "node:fs";

/**
 *  对内容进行哈希
 */
export function hash(...data: BinaryLike[]) {
  const h = crypto.createHash("md5");
  for (const d of data) {
    h.update(d);
  }
  return h.digest("hex");
}

/**
 *  读取目录
 */
export function readdir(
  path: string,
  options?: { recursive?: boolean; exclude?: Array<string> },
): Array<string> {
  const dirs = fs.readdirSync(path, { recursive: options?.recursive }) as string[];
  return dirs.filter(dir => !options?.exclude?.includes(String(dir)));
}

export function readfile(path: string) {
  return fs.readFileSync(path);
}

export function writefile({
  filename,
  data,
}: {
  filename: string;
  data: string | NodeJS.ArrayBufferView;
}) {
  fs.writeFileSync(filename, data);
}
