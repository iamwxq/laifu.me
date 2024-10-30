// 标签
export interface Tag {
  id: number;
  name: string;
  count: number;
}

// 文章元数据
export interface Meta {
  slug: string;
  title: string;
  brief: string;
  words: number;
  datetime: Date;
  archived: boolean;
  tag: Tag | null;
}

// 文章原始元数据
export type RawMeta = Omit<Meta, "tag"> & { tagId: number | null };

// 首页统计数据
export interface Statistics {
  articles: number;
  words: number;
}

// 分页查询结果
export interface PRes<T> {
  totalpage: number;
  total: number;
  page: number;
  pagesize: number;
  data: T[] | null;
}
