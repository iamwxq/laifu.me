import type { Statistics } from "~/.server/model";
import { NavLink } from "@remix-run/react";
import clsx from "clsx";
import { fNumber } from "~/utils";
import avatar from "/me.jpg?url";

interface Props {
  statistics: Statistics | undefined;
  sticky?: boolean;
}

function Me({ statistics, sticky = true }: Props) {
  return (
    <aside className={clsx(
      !sticky && "relative",
      "mx-auto max-w-lg text-black dark:text-white",
      sticky && "sticky top-[57px]",
    )}
    >
      <div className="mx-auto flex flex-col gap-4 pb-14 pt-12 lg:pt-3">
        <NavLink className="mx-auto w-24 rounded-full" to="/about">
          <img
            alt="author's avatar"
            className="cursor-pointer rounded-full transition-all duration-300 hover:ring hover:ring-zinc-300"
            src={avatar}
          />
        </NavLink>

        <div className="text-center text-lg">伍闲犬</div>

        <div className="grid grid-cols-2 divide-x dark:divide-zinc-700">
          <div className="mr-4 flex flex-col items-center">
            <NavLink
              className="hover:underline"
              to="/blog?p=1"
            >
              {fNumber(statistics?.posts)}
            </NavLink>
            <span className="select-none">文章</span>
          </div>

          <div className="flex flex-col items-center">
            <span>{fNumber(statistics?.words)}</span>
            <span className="select-none">字数</span>
          </div>
        </div>

        <blockquote className="mt-4 text-center font-normal not-italic text-zinc-600">那我懂你意思了</blockquote>
      </div>

      <NavLink
        className="absolute bottom-0 right-10 flex items-center text-zinc-400 transition-all duration-300 hover:text-zinc-700 hover:underline dark:hover:text-zinc-100"
        to="/about"
      >
        <span className="text-sm">关于我 &rarr;</span>
      </NavLink>
    </aside>
  );
};

export default Me;
