import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { findManyArticles, findStatistics } from "~/.server/dal/article";
import avatar from "~/assets/images/avatar.jpg";
import Article from "~/components/article";
import { fNumber } from "~/utils";

export async function loader() {
  const articles = await findManyArticles();
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
            Life finally meets treasure.
          </h1>
          <p className="py-2 text-center text-xl tracking-widest">
            或许吧...
          </p>
        </b>
      </div>

      <main className="grid grid-cols-9 pt-20 text-black dark:text-white">
        <ul className="col-span-7 grid grid-cols-2 gap-8">
          {articles.map(article => <Article key={article.slug} article={article} />)}
        </ul>

        <aside className="sticky top-[57px] col-span-2 self-start">
          <div className="mx-auto flex flex-col gap-4 py-3 pb-14">
            <NavLink className="mx-auto w-24 rounded-full" to="/about">
              <img
                alt="author's avatar"
                className="cursor-pointer rounded-full transition-all duration-300 hover:ring hover:ring-zinc-300"
                src={avatar}
              />
            </NavLink>

            <div className="text-center text-lg">伍闲犬</div>

            <div className="mx-auto flex">
              <div className="mr-4 flex flex-col items-center border-r pr-4 dark:border-zinc-700">
                <NavLink
                  className="hover:underline"
                  to="/blog?p=1"
                >
                  {fNumber(statistics.articles)}
                </NavLink>
                <span className="select-none">文章</span>
              </div>

              <div className="flex flex-col items-center">
                <span>{fNumber(statistics.words)}</span>
                <span className="select-none">字数</span>
              </div>
            </div>

            <blockquote className="no-italic text-center font-normal text-zinc-400">那我懂你意思了</blockquote>
          </div>

          <NavLink
            className="absolute bottom-0 right-9 flex items-center text-zinc-400 transition-all duration-300 hover:text-zinc-700 hover:underline dark:hover:text-zinc-100"
            to="/about"
          >
            <span className="text-sm">关于我 &rarr;</span>
          </NavLink>
        </aside>
      </main>
    </div>
  );
};

export default Index;
