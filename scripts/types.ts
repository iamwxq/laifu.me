export interface PostMeta {
  tag: string;
  slug: string;
  title: string;
  brief: string;
  words: number;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface QueueItem {
  meta: PostMeta;
  content: string;
  filename: string;
}

export interface Queue {
  updates: QueueItem[];
  creates: QueueItem[];
}

export enum DBConsts {
  TAG_NOT_EXIST = -9999,
  TAG_NOT_CHANGED = -8888,
}

export enum Errors {
  NO_SLUG = "必须通过 '-s <SLUG>'、'--slug <SLUG>'、'-s=<SLUG>' 或 '--slug=<SLUG>' 传入文章的 slug 参数",
  TO_MANY_SLUG = "'-s <SLUG>'、'--slug <SLUG>'、'-s=<SLUG>' 或 '--slug=<SLUG>' 只能传入其中一种格式",
  SLUG_NOT_EXIST = "SLUG 不存在，请检查",
}
