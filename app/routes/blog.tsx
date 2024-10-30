import type { LoaderFunctionArgs } from "@remix-run/node";
import type { FormEvent } from "react";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { findArticlesByKeywordAndPage, findArticlesByPage, findArticlesByTagAndPage } from "~/.server/dal/article";
import { findManyTags } from "~/.server/dal/tag";
import clsx from "clsx";
import { CircleX, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Article from "~/components/article";

function useDebounce(fn: (...args: any[]) => any, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const t = url.searchParams.get("t");
  const p = url.searchParams.get("p");
  const q = url.searchParams.get("q");

  let articlelist;
  let page = Number(p);
  const id = Number(t);
  page = Number.isNaN(page) ? 1 : page;

  // 获取标签列表
  const taglist = await findManyTags();

  // 获取文章结果列表
  if (q) {
    articlelist = await findArticlesByKeywordAndPage({ page, q });
  }
  else if (id > 0) { // tag id 不小于 1
    articlelist = await findArticlesByTagAndPage({ page, id });
  }
  else {
    articlelist = await findArticlesByPage({ page });
  }

  return json({ t, q, p, articlelist, taglist });
}

function Blog() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { t, q: _q, articlelist, taglist } = useLoaderData<typeof loader>();
  // const [page, setPage] = useState(1);
  const [q, setQ] = useState(_q || "");
  const qRef = useRef<HTMLInputElement>(null);
  const tagId = Number(t);

  // 提交防抖
  const debouncedSubmit = useDebounce((e: EventTarget & HTMLFormElement) => submit(e, { replace: true }), 300);

  function handleInput(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    setQ(target.value);
    debouncedSubmit(e.currentTarget);
  }

  // 同时会清除对标签的筛选
  function handleClear() {
    setQ("");
    navigate("/blog?p=1", { replace: true });
  }

  useEffect(() => {
    const input = qRef.current;
    if (!input)
      return;

    input.value = _q || "";
  }, [_q]);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="flex items-center gap-3 rounded-[5px] px-2 py-[5px] text-zinc-400 shadow-sm outline outline-[1.5px] outline-zinc-400 transition-all focus-within:shadow-md focus-within:outline-zinc-900 dark:bg-zinc-800 dark:outline-zinc-800 dark:focus-within:outline-zinc-100">
          <Search className="size-[18px] dark:text-zinc-300" />

          <Form
            className="flex-1"
            role="search"
            onChange={e => handleInput(e)}
          >
            <input hidden defaultValue="1" name="p" />
            <input
              ref={qRef}
              aria-label="搜索文章"
              className="h-7 w-full text-zinc-900 outline-none transition-all dark:bg-zinc-800 dark:text-zinc-100"
              defaultValue={q || ""}
              name="q"
              placeholder="搜索文章"
              type="search"
            />
          </Form>
          <button
            className={clsx({ hidden: !q })}
            type="reset"
            onClick={handleClear}
          >
            <CircleX className="size-4 text-zinc-400 transition-all hover:text-zinc-800 dark:hover:text-zinc-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6">
        <aside className="sticky top-[57px] col-span-1 mx-auto max-w-lg self-start pt-6">
          <ul className="flex flex-col">
            {taglist.map(tag => (
              <Link
                key={tag.id}
                to={`/blog?p=1&t=${tag.id}`}
                className={clsx(
                  "rounded-md px-2 py-2.5 transition-all hover:bg-zinc-50 hover:text-cyan-500 dark:hover:bg-slate-900/70",
                  { "text-zinc-500 dark:text-zinc-300": tag.id !== tagId },
                  { "text-cyan-500": tag.id === tagId },
                )}
                onClick={() => setQ("")}
              >
                {tag.name}({tag.count})
              </Link>
            ))}
          </ul>
        </aside>

        <main className="col-span-5">
          <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-12">
            {articlelist.data?.map(article => <Article key={article.slug} article={article} />)}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Blog;
