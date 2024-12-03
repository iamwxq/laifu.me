import type { ArchivedPosts } from "~/.server/model";
import { Link, useLoaderData } from "@remix-run/react";
import { findAchivedPosts } from "~/.server/dal/archive";
import Tag from "~/components/tag";
import { fDatetime, monthMap } from "~/utils";

interface LoaderReturnType {
  aposts: ArchivedPosts;
}

export async function loader() {
  const posts = await findAchivedPosts();

  // 根据贴文的年月归档
  const aposts: ArchivedPosts = {};
  posts.forEach((post) => {
    const year = fDatetime(post.createdAt, "YYYY");
    const month = fDatetime(post.createdAt, "M");
    if (aposts[year]) {
      aposts[year][month] = [...aposts[year][month] ?? [], post];
    }
    else {
      aposts[year] = { [month]: [post] };
    }
  });

  return Response.json({ aposts });
}

function Archive() {
  const { aposts } = useLoaderData<LoaderReturnType>();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="py-4 text-black dark:text-white">
        {Object.entries(aposts).map(([year, month]) => (
          <ul key={year}>
            <h3 className="text-2xl font-semibold text-black dark:text-white">
              {year} 年
            </h3>

            <div className="ml-[2em] grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(month)
                .sort((a, b) => Number.parseInt(b[0]) - Number.parseInt(a[0]))
                .map(([m, p]) => (
                  <div key={m}>
                    <h4 className="text-lg text-zinc-600 dark:text-zinc-300">{monthMap(m)}</h4>

                    <div className="flex flex-col gap-2">
                      {p.map(post => (
                        <li key={post.slug} className="ml-[1em]">
                          <Link
                            className="hover:underline"
                            to={`/blog/${post.slug}`}
                          >
                            {post.title}
                          </Link>
                          <div className="flex items-center gap-1 text-sm text-zinc-400">
                            <span>{fDatetime(post.createdAt)}</span>
                            <Tag tag={post.tag} />
                          </div>
                        </li>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Archive;
