import type { LoaderFunctionArgs } from "@remix-run/node";
import type { FormEvent } from "react";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { findArticlesByKeywordAndPage, findArticlesByPage, findArticlesByTagAndPage } from "~/.server/dal/article";
import { findManyTags } from "~/.server/dal/tag";
import clsx from "clsx";
import { CircleX, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Article from "~/components/article";
import Pagination from "~/components/pagination";

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
  const id = Number(t);
  const page = Number(p);

  // 四个参数守卫
  if (page < 1 || Number.isNaN(page)) {
    // 这个 redierct 有可能会流转到下一个守卫并再次 redierct
    // 比如 /blog?p=-1&t=&q=web
    // 保证 p 的合法性
    return redirect(`/blog?p=1${t === null ? "" : `&t=${t}`}${q === null ? "" : `&q=${q}`}`);
  }
  if (t !== null && q !== null) {
    // t 和 q 同时存在时 仅保留 q
    return redirect(`/blog?p=${page}&q=${q}`);
  }
  if (q === "") {
    // 仅为了路由的整洁性
    return redirect(`/blog?p=${page}`);
  }
  // 获取标签列表
  const taglist = await findManyTags();
  if (t !== null && !taglist.map(t => t.id).includes(id)) {
    return redirect(`/blog?p=${page}`);
  }

  // 获取文章结果列表
  if (q) {
    // 关键词模糊搜索
    articlelist = await findArticlesByKeywordAndPage({ page, q });
  }
  else if (id > 0) { // tag id 不小于 1
    // 标签筛选
    articlelist = await findArticlesByTagAndPage({ page, id });
  }
  else {
    // 无条件查询
    articlelist = await findArticlesByPage({ page });
  }

  return json({ tagId: id, q, p, articlelist, taglist });
}

function Blog() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { tagId, q, articlelist, taglist } = useLoaderData<typeof loader>();
  // const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(q || "");
  const qRef = useRef<HTMLInputElement>(null);

  // 提交防抖
  const debouncedSubmit = useDebounce((e: EventTarget & HTMLFormElement) => submit(e, { replace: true }), 300);

  function handleInput(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    setKeyword(target.value);
    debouncedSubmit(e.currentTarget);
  }

  // 同时会清除对标签的筛选
  function handleClear() {
    setKeyword("");
    navigate("/blog?p=1", { replace: true });
  }

  function handleClickTag(id: number) {
    setKeyword("");
    if (tagId === id) {
      navigate("/blog?p=1", { replace: true });
    }
    else {
      navigate(`/blog?p=1&t=${id}`, { replace: true });
    }
  }

  useEffect(() => {
    const input = qRef.current;
    if (!input)
      return;

    input.value = q || "";
  }, [q]);

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
              defaultValue={keyword || ""}
              name="q"
              placeholder="搜索文章"
              type="search"
            />
          </Form>
          <button
            className={clsx({ hidden: !keyword })}
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
              <button
                key={tag.id}
                type="button"
                className={clsx(
                  "rounded-md px-2 py-2.5 text-start transition-all hover:bg-zinc-50 hover:text-cyan-500 dark:hover:bg-slate-900/70",
                  { "text-zinc-500 dark:text-zinc-300": tag.id !== tagId },
                  { "text-cyan-500": tag.id === tagId },
                )}
                onClick={() => handleClickTag(tag.id)}
              >
                {tag.name} ({tag.count})
              </button>
            ))}
          </ul>
        </aside>

        <main className="col-span-5">
          <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-12">
            {articlelist.data?.map(article => <Article key={article.slug} article={article} />)}
          </ul>

          {articlelist.totalpage > 1 && (
            <Pagination
              totalpage={articlelist.totalpage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;
