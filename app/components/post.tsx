import type { PostMeta } from "~/.server/model";
import { Link } from "@remix-run/react";
import Tag from "~/components/tag";
import { fDatetime } from "~/utils";

interface Props {
  post: PostMeta;
}

function Post({ post }: Props) {
  return (
    <div className="py-3">
      <article
        key={post.slug}
        className="mx-auto flex max-w-sm flex-col gap-2 p-2 leading-relaxed text-black dark:text-white"
      >
        <Link
          className="cursor-pointer py-1.5 text-xl font-semibold hover:underline"
          to={`/blog/${post.slug}`}
        >
          {post.title}
        </Link>

        <p className="text-zinc-600 dark:text-zinc-200">
          {post.brief}
        </p>

        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <div className="select-none">
            {fDatetime(post.createdAt)}
          </div>

          {post.tag && <Tag tag={post.tag} />}
        </div>
      </article>
    </div>
  );
};

export default Post;
