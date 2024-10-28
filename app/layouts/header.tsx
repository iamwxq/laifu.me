import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

type NavList = {
  to: string;
  label: string;
  hidden?: boolean;
}[];

const navlist: NavList = [
  {
    to: "/blog",
    label: "文章",
  },
  {
    to: "/about",
    label: "关于",
  },
  {
    to: "/archive",
    label: "归档",
  },
];

export default function Header() {
  const location = useLocation();

  return (
    <header
      className={clsx(
        "sticky top-0 z-10 w-full border-b border-zinc-50 bg-white px-4 py-2",
        "dark:bg-black",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className={clsx(
              "cursor-pointer select-none rounded-md px-3 py-1 text-xl font-semibold text-zinc-800",
              "hover:bg-zinc-100/70 dark:text-zinc-50 dark:hover:bg-slate-900",
            )}
          >
            来福
          </Link>
        </div>

        <nav className="flex items-center justify-between">
          {navlist.map(nav => (
            !nav.hidden && (
              <Link
                key={nav.to}
                to={nav.to}
                className={clsx(
                  "select-none rounded-md px-4 py-2 transition-all duration-75",
                  "hover:bg-zinc-100/70 dark:hover:bg-slate-900",
                  {
                    "font-semibold text-cyan-500": location.pathname === nav.to,
                    "text-zinc-500 dark:text-zinc-50": location.pathname !== nav.to,
                  },
                )}
              >
                {nav.label}
              </Link>
            )
          ))}
        </nav>

        <ModeToggle />
      </div>
    </header>
  );
}
