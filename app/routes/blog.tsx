import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, json, Link, Outlet, useLoaderData, useLocation, useNavigate, useRouteError } from "@remix-run/react";
import { findAllSlugs, findPostBySlug, findStatistics } from "~/.server/dal/post";
import { ArrowLeft, ArrowUp, Dot } from "lucide-react";
import React, { useEffect, useState } from "react";
import CircleButton from "~/components/circle-button";
import Me from "~/components/me";
import Tag from "~/components/tag";
import ErrorUnauthorized from "~/errors/unauthorized";
import styles from "~/styles/post.css?url";
import { ErrorCode } from "~/types";
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
  const slugs = await findAllSlugs();
  if (!slugs.includes(slug)) {
    throw json(
      { message: "no permission to access this post" },
      {
        status: ErrorCode.Unauthorized,
        statusText: "no permission",
      },
    );
  }

  const postmeta = await findPostBySlug({ slug });
  const statistics = await findStatistics();

  return json({ postmeta, statistics });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === ErrorCode.Unauthorized) {
    return <ErrorUnauthorized />;
  }

  throw json(
    {
      message: "other type errors",
    },
    {
      status: ErrorCode.InternalSystem,
    },
  );
}

function Blog() {
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const { postmeta, statistics } = useLoaderData<typeof loader>();
  const [headings, setHeadings] = useState<Array<{ tc: string;id: string }>>([]);

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
    <div className="grid max-w-7xl grid-cols-10 gap-8">
      <div className="col-span-8 py-8">
        <div className="mx-auto max-w-3xl">
          {postmeta && (
            <div>
              <abbr className="flex flex-col text-zinc-600 dark:text-zinc-300">
                <div className="flex select-none items-center text-sm">
                  <time>{fDatetime(postmeta.updatedAt)}</time>
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

      <div className="col-span-2 pt-8">
        <Me statistics={statistics} sticky={false} />
        <ul className="sticky top-[57px] mt-20 flex flex-col gap-1 pt-3">
          {headings.length > 0 && <div className="mb-4 text-center text-lg text-zinc-700 dark:text-zinc-100">大纲</div>}
          {headings.map(h => (
            <Link
              key={h.id}
              className="self-end rounded-md px-1.5 py-0.5 text-right text-zinc-500 transition-all hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-600"
              to={h.id}
              onClick={e => handleClickAnchor(e, h.id)}
            >
              {h.tc}
            </Link>
          ))}
          <div className="bottom-10 flex flex-col gap-3 self-end pt-8">
            <CircleButton behavior={() => navigate(-1)}>
              <ArrowLeft />
            </CircleButton>

            <CircleButton
              behavior={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              visible={show}
            >
              <ArrowUp />
            </CircleButton>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Blog;
