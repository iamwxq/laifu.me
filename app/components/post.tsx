import type { json, useLoaderData } from "@remix-run/react";
import type { PostMeta } from "~/.server/model";
import Tag from "~/components/tag";
import { fDatetime } from "~/utils";

interface Props {
  post: ReturnType<typeof useLoaderData<typeof json<PostMeta>>>;
}

function Post({ post }: Props) {
  return (
    <article
      key={post.slug}
      className="box-border flex flex-col gap-2 p-2 leading-relaxed text-black dark:text-white"
    >
      <h2 className="cursor-pointer text-xl font-semibold hover:underline">{post.title}</h2>
      <p className="text-zinc-600 dark:text-zinc-200">{post.brief}</p>
      <div className="flex items-center gap-3 text-sm text-zinc-400">
        <div className="select-none">{fDatetime(post.datetime)}</div>
        {post.tag && <Tag tag={post.tag} />}
      </div>
    </article>
  );
};

export default Post;
