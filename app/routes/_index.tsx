import type { PostMeta, Statistics } from "~/.server/model";
import { useLoaderData } from "@remix-run/react";
import { findAllPosts, findStatistics } from "~/.server/dal/post";
import Me from "~/components/me";
import Post from "~/components/post";

interface LoaderReturnType {
  posts: Array<PostMeta>;
  statistics: Statistics;
}

export async function loader() {
  const posts = await findAllPosts();
  const statistics = await findStatistics();

  return Response.json({ posts, statistics });
}

function Index() {
  const { posts, statistics } = useLoaderData<LoaderReturnType>();

  return (
    <div>
      <div className="mt-8 py-28 transition-all">
        <b className="mx-auto block max-h-screen max-w-2xl font-normal text-black dark:text-white">
          <h1 className="py-10 text-2xl font-semibold tracking-widest">
            Life finally meets pleasure.
          </h1>
          <p className="py-2 text-center text-xl tracking-widest">
            或许吧...
          </p>
        </b>
      </div>

      <main className="pt-20 text-black lg:grid lg:grid-cols-9 dark:text-white">
        <ul className="col-span-7 md:grid md:grid-cols-2 md:gap-4 lg:gap-8">
          {posts.map(post => <Post key={post.slug} post={post} />)}
        </ul>

        <Me sticky statistics={statistics} />
      </main>
    </div>
  );
};

export default Index;
