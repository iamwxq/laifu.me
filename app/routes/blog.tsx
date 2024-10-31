import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, Outlet, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { findPostBySlug, findStatistics } from "~/.server/dal/post";
import { Dot } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Me from "~/components/me";
import Tag from "~/components/tag";
import styles from "~/styles/post.css?url";
import { fDatetime, fNumber } from "~/utils";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const slash = url.pathname.lastIndexOf("/");
  const slug = url.pathname.slice(slash + 1);
  const postmeta = await findPostBySlug(slug);
  const statistics = await findStatistics();

  return json({ postmeta, statistics });
}

function Blog() {
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  const [headings, setHeadings] = useState<Array<{ tc: string;id: string }>>([]);
  const { postmeta, statistics } = useLoaderData<typeof loader>();

  function handleClickAnchor(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) {
    e.preventDefault();
    const heading = document.querySelector(id);
    if (heading) {
      const y = heading.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", id);
    }
  }

  useEffect(() => {
    const temp: typeof headings = [];
    const nodes = document.querySelectorAll(".content [id]");
    nodes.forEach(heading => temp.push({ tc: heading.textContent || "", id: `#${heading.id}` }));
    setHeadings(temp);

    if (!hash.startsWith("#"))
      return;

    const dechash = decodeURIComponent(hash);
    const index = temp.findIndex(h => h.id === dechash);
    if (index !== -1) {
      const heading = nodes.item(index);
      const y = heading.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "instant" });
    }
    else {
      navigate(pathname, { replace: true });
    }
  }, []);

  return (
    <div className="max-auto grid max-w-7xl grid-cols-10 gap-8">
      <div className="col-span-8 py-8">
        <div className="mx-auto max-w-3xl">
          {postmeta && (
            <div>
              <abbr className="flex flex-col text-zinc-600 dark:text-zinc-300">
                <div className="flex select-none items-center text-sm">
                  <time>{fDatetime(postmeta.datetime)}</time>
                  <Dot className="size-5" />
                  <span>{fNumber(postmeta.words)} 字数</span>
                  {postmeta.tag && (
                    <>
                      <Dot className="size-5" />
                      <Tag tag={postmeta.tag} />
                    </>
                  )}
                </div>
                <h1 className="mb-8 pt-6 text-4xl font-semibold text-black dark:text-white">{postmeta.title}</h1>
                <p className="text-lg text-zinc-700 dark:text-zinc-200">{postmeta.brief}</p>
              </abbr>
              <hr className="my-12 border-zinc-200 dark:border-zinc-700" />
            </div>
          )}
          <div className="content">
            <Outlet />
          </div>
          <hr className="my-12 border-zinc-200 dark:border-zinc-700" />
        </div>
      </div>
      <div className="col-span-2 mx-auto pt-8">
        <Me statistics={statistics} sticky={false} />
        <ul className="sticky top-[57px] mt-20 flex flex-col gap-1 pt-3">
          <div className="mb-4 text-center text-lg dark:text-zinc-100">大纲</div>
          {headings.map(h => (
            <Link
              key={h.id}
              className="self-end rounded-md px-1.5 py-0.5 transition-all dark:text-zinc-200 dark:hover:bg-zinc-600"
              to={h.id}
              onClick={e => handleClickAnchor(e, h.id)}
            >
              {h.tc}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
