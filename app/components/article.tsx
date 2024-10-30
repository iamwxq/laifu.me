import type { json, useLoaderData } from "@remix-run/react";
import type { Meta } from "~/.server/model";
import Tag from "~/components/tag";
import { fDatetime } from "~/utils";

interface Props {
  article: ReturnType<typeof useLoaderData<typeof json<Meta>>>;
}

function Article({ article }: Props) {
  return (
    <article
      key={article.slug}
      className="box-border flex flex-col gap-2 p-2 leading-relaxed text-black dark:text-white"
    >
      <h2 className="cursor-pointer text-xl font-semibold hover:underline">{article.title}</h2>
      <p className="text-zinc-600 dark:text-zinc-200">{article.brief}</p>
      <div className="flex items-center gap-3 text-sm text-zinc-400">
        <div>{fDatetime(article.datetime)}</div>
        {article.tag && <Tag tag={article.tag} />}
      </div>
    </article>
  );
};

export default Article;
