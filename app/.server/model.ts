// 标签
export interface Tag {
  id: number;
  name: string;
  count: number;
}

// 文章元数据
export interface PostMeta {
  tag: Tag;
  slug: string;
  title: string;
  brief: string;
  words: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 文章原始元数据
export type RawPostMeta = Omit<PostMeta, "tag"> & { tagId: number };

// 归档文章
export interface ArchivedPosts {
  [K: string]: PostMeta[];
}

// 首页统计数据
export interface Statistics {
  posts: number;
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
