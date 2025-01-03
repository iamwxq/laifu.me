import { NavLink, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

function Header() {
  const location = useLocation();
  const [theme, setTheme] = useTheme();

  function handleSwitchTheme() {
    switch (theme) {
      case Theme.DARK:
        setTheme(Theme.LIGHT);
        break;
      case Theme.LIGHT:
        setTheme(Theme.DARK);
    }
  }

  return (
    <header className={clsx(
      "sticky top-0 z-10 w-full border-b border-zinc-50 bg-opacity-[88.5%] px-4 py-2 backdrop-blur",
      "dark:border-zinc-800",
    )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center justify-center">
          <NavLink
            to="/"
            className={clsx(
              "cursor-pointer select-none rounded-md px-3 py-1 text-xl font-semibold text-zinc-800",
              "hover:bg-zinc-100/70 dark:text-zinc-50 dark:hover:bg-slate-900/70",
            )}
          >
            来福
          </NavLink>
        </div>

        <nav className="flex items-center justify-between">
          <NavLink
            to="/blog?p=1"
            className={clsx(
              "select-none rounded-md px-4 py-2 transition-all duration-75 hover:bg-zinc-100/70 dark:hover:bg-slate-900/70",
              {
                "font-semibold text-cyan-500": location.pathname === "/blog",
                "text-zinc-800 dark:text-zinc-50": location.pathname !== "/blog",
              },
            )}
          >
            文章
          </NavLink>

          <NavLink
            to="/about"
            className={clsx(
              "select-none rounded-md px-4 py-2 transition-all duration-75 hover:bg-zinc-100/70 dark:hover:bg-slate-900/70",
              {
                "font-semibold text-cyan-500": location.pathname === "/about",
                "text-zinc-800 dark:text-zinc-50": location.pathname !== "/about",
              },
            )}
          >
            关于
          </NavLink>

          <NavLink
            to="/archive"
            className={clsx(
              "select-none rounded-md px-4 py-2 transition-all duration-75 hover:bg-zinc-100/70 dark:hover:bg-slate-900/70",
              {
                "font-semibold text-cyan-500": location.pathname === "/archive",
                "text-zinc-800 dark:text-zinc-50": location.pathname !== "/archive",
              },
            )}
          >
            归档
          </NavLink>
        </nav>

        <button
          className="group flex items-center justify-center px-3 py-1"
          type="button"
          onClick={handleSwitchTheme}
        >
          <Sun className="hidden size-5 cursor-pointer select-none text-zinc-400 transition-all group-hover:text-zinc-50 dark:block" />
          <Moon className="block size-5 cursor-pointer select-none text-zinc-400 transition-all group-hover:text-zinc-800 dark:hidden" />
        </button>
      </div>
    </header>
  );
}

export default Header;
