import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findAllPosts, findStatistics } from "~/.server/dal/post";
import Me from "~/components/me";
import Post from "~/components/post";

export async function loader() {
  const articles = await findAllPosts();
  const statistics = await findStatistics();

  return json({ articles, statistics });
}

function Index() {
  const { articles, statistics } = useLoaderData<typeof loader>();

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

      <main className="grid grid-cols-9 pt-20 text-black dark:text-white">
        <ul className="col-span-7 grid grid-cols-2 gap-8">
          {articles.map(post => <Post key={post.slug} post={post} />)}
        </ul>

        <Me sticky statistics={statistics} />
      </main>
    </div>
  );
};

export default Index;
