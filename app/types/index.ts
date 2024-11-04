export enum ErrorCode {
  Unauthorized = 401,
  NotFound = 404,
  InternalSystem = 500,
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5;
export type HeadingName = "H1" | "H2" | "H3" | "H4" | "H5";

export interface Heading {
  tc: string;
  id: string;
  lvl: HeadingLevel;
}
