import type { LoaderFunctionArgs } from "@remix-run/node";
import type { FormEvent } from "react";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { getFakeTagList } from "~/.server/data";
import clsx from "clsx";
import { CircleX, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  // search params
  const url = new URL(request.url);
  const t = url.searchParams.get("t");
  const search = url.searchParams.get("q");
  const p = url.searchParams.get("p");

  // data
  const taglist = await getFakeTagList();

  return json({ t, search, taglist, p });
}

function Blog() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { search, taglist } = useLoaderData<typeof loader>();
  // const [page, setPage] = useState(1);
  const [q, setQ] = useState(search || "");
  const qRef = useRef<HTMLInputElement>(null);

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

    input.value = search || "";
  }, [search]);

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

      <div className="flex">
        <ul className="flex flex-col ">
          {taglist.map(tag => (
            <Link
              key={tag.id}
              className="text-zinc-500 dark:text-zinc-300"
              to={`/blog?p=1&t=${tag.name}`}
            >
              {tag.name}({tag.count})
            </Link>
          ))}
        </ul>

        <ul></ul>
      </div>
    </div>
  );
};

export default Blog;
