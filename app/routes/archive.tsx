import type { ArchivedPosts } from "~/.server/model";
import { Link, useLoaderData } from "@remix-run/react";
import { findAchivedPosts } from "~/.server/dal/archive";
import { fDatetime } from "~/utils";

interface LoaderReturnType {
  archivedPosts: ArchivedPosts;
}

export async function loader() {
  const posts = await findAchivedPosts();

  // 根据贴文的年份归档
  const archivedPosts: ArchivedPosts = {};
  posts.forEach((post) => {
    const year = fDatetime(post.createdAt, "YYYY");
    archivedPosts[year] = [...(archivedPosts[year] ?? []), post];
  });

  return Response.json({ archivedPosts });
}

function Archive() {
  const { archivedPosts } = useLoaderData<LoaderReturnType>();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="">
        {Object.keys(archivedPosts).map(year => (
          <ul key={year}>
            <h3 className="text-xl font-semibold">
              {year} 年
            </h3>

            {archivedPosts[year].map(post => (
              <li key={post.slug}>
                <Link
                  className="hover:underline"
                  to={`/blog/${post.slug}`}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Archive;
