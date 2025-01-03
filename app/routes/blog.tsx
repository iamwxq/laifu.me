import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, Link, Outlet, useLoaderData, useLocation, useNavigate, useRouteError } from "@remix-run/react";
import { findAllSlugs, findPostBySlug, findStatistics } from "~/.server/dal/post";
import clsx from "clsx";
import { ArrowLeft, ArrowUp, Dot } from "lucide-react";
import React, { useEffect, useState } from "react";
import CircleButton from "~/components/circle-button";
import Me from "~/components/me";
import Tag from "~/components/tag";
import ErrorUnauthorized from "~/errors/unauthorized";
import blockQuoteStyles from "~/styles/block-quote.css?url";
import codeStyles from "~/styles/code.css?url";
import figureStyles from "~/styles/figure.css?url";
import listStyles from "~/styles/list.css?url";
import paragraphStyles from "~/styles/paragraph.css?url";
import type { Heading, HeadingName } from "~/types";
import { ErrorCode } from "~/types";
import { fDatetime, fNumber } from "~/utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: listStyles },
  { rel: "stylesheet", href: codeStyles },
  { rel: "stylesheet", href: figureStyles },
  { rel: "stylesheet", href: paragraphStyles },
  { rel: "stylesheet", href: blockQuoteStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const slash = url.pathname.lastIndexOf("/");

  const slug = url.pathname.slice(slash + 1);
  const slugs = await findAllSlugs();
  if (!slugs.includes(slug)) {
    throw Response.json(
      { message: "no permission to access this post" },
      {
        status: ErrorCode.Unauthorized,
        statusText: "no permission",
      },
    );
  }

  const postmeta = await findPostBySlug({ slug });
  const statistics = await findStatistics();

  return Response.json({ postmeta, statistics });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === ErrorCode.Unauthorized) {
    return <ErrorUnauthorized />;
  }

  throw Response.json(
    { message: "other type errors" },
    { status: ErrorCode.InternalSystem },
  );
}

function Blog() {
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const [headings, setHeadings] = useState<Array<Heading>>([]);
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

  function handleBackBehavior() {
    navigate(-1);
  }

  function handleScrollTopBehavior() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const temp: typeof headings = [];
    const nodes = document.querySelectorAll(".content [id]");
    const ish = (t: string): t is HeadingName => /^H[1-6]$/.test(t);
    nodes.forEach((heading) => {
      if (ish(heading.tagName)) {
        temp.push({
          id: `#${heading.id}`,
          lvl: heading.tagName,
          tc: heading.textContent || "",
        });
      }
    });
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

  useEffect(() => {
    const toggle = () => {
      const y = window.scrollY;
      if (y > 32) {
        setShow(true);
      }
      else {
        setShow(false);
      }
    };

    toggle();

    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <div className="max-w-7xl xl:grid xl:grid-cols-10 xl:gap-8">
      <div className="col-span-8 py-8">
        <div className="mx-auto max-w-3xl">
          {postmeta && (
            <div>
              <abbr className="flex flex-col text-zinc-600 dark:text-zinc-300">
                <div className="flex select-none items-center text-sm">
                  <time>{fDatetime(postmeta.createdAt)}</time>
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
                <div className="mt-5 select-none text-end text-sm italic text-zinc-400 dark:text-zinc-500">
                  最近一次更新：{fDatetime(postmeta.updatedAt)}
                </div>
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

      <div className="col-span-2 xl:pt-8">
        <div>
          <Me statistics={statistics} sticky={false} />
        </div>
        <ul className="sticky top-[57px] mt-20 hidden gap-0 pt-3 xl:flex xl:flex-col">
          {headings.length > 0 && <div className="mb-4 text-center text-lg text-zinc-700 dark:text-zinc-100">大纲</div>}
          {headings.map((h, i) => (
            <div
              key={h.id}
              className={clsx(
                "text-start",
                h.lvl === "H2" && i !== 0 && "mt-2",
                h.lvl === "H3" && "ml-4",
                h.lvl === "H4" && "ml-8",
                h.lvl === "H5" && "ml-12",
                h.lvl === "H6" && "ml-14",
              )}
            >
              <Link
                className="rounded-md px-1.5 py-0.5 text-right text-zinc-500 transition-all hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-600"
                to={h.id}
                onClick={e => handleClickAnchor(e, h.id)}
              >
                {h.tc}
              </Link>
            </div>
          ))}
          <div className="bottom-10 mr-8 flex flex-col gap-3 self-end pt-8">
            <CircleButton behavior={handleBackBehavior}>
              <ArrowLeft />
            </CircleButton>

            <CircleButton behavior={handleScrollTopBehavior} visible={show}>
              <ArrowUp />
            </CircleButton>
          </div>
        </ul>
      </div>

      <div className="fixed bottom-4 right-5 flex flex-col gap-3 xl:hidden">
        <CircleButton behavior={handleBackBehavior}>
          <ArrowLeft />
        </CircleButton>

        <CircleButton behavior={handleScrollTopBehavior} visible={show}>
          <ArrowUp />
        </CircleButton>
      </div>
    </div>
  );
};

export default Blog;
