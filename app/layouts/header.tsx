import { NavLink, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

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

function Header() {
  const location = useLocation();
  const [mode, setMode] = useTheme();

  const show = mode === Theme.DARK;

  function handleSwitchMode() {
    switch (mode) {
      case Theme.DARK:
        setMode(Theme.LIGHT);
        break;
      case Theme.LIGHT:
        setMode(Theme.DARK);
        break;
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
          {navlist.map(nav => (
            !nav.hidden && (
              <NavLink
                key={nav.to}
                to={nav.to}
                className={clsx(
                  "select-none rounded-md px-4 py-2 transition-all duration-75",
                  "hover:bg-zinc-100/70 dark:hover:bg-slate-900/70",
                  {
                    "font-semibold text-cyan-500": location.pathname === nav.to,
                    "text-zinc-500 dark:text-zinc-50 hover:text-zinc-800 dark:hover:text-zinc-50": location.pathname !== nav.to,
                  },
                )}
              >
                {nav.label}
              </NavLink>
            )
          ))}
        </nav>

        <button
          className="group flex items-center justify-center px-3 py-1"
          type="button"
          onClick={handleSwitchMode}
        >
          <Sun
            className={clsx(
              "size-5 cursor-pointer select-none text-zinc-200 transition-all",
              "group-hover:text-zinc-50",
              { hidden: !show },
            )}
          />

          <Moon
            className={clsx(
              "size-5 cursor-pointer select-none text-zinc-500 transition-all",
              "group-hover:text-zinc-800",
              { hidden: show },
            )}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
