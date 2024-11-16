import { Link } from "@remix-run/react";
import clsx from "clsx";
import { Mail } from "lucide-react";

function Footer() {
  const now = new Date().getFullYear();

  return (
    <footer className="mt-auto flex select-none items-center p-8 text-sm text-zinc-500 dark:text-zinc-300">
      <div className="transition-all">&copy; {now} 来福 Preserved</div>

      <em className="ml-4 border-l border-zinc-200 pl-4 not-italic">
        <span className="transition-all">Powered by&nbsp;</span>
        <Link
          className="transition-all hover:text-zinc-800 dark:hover:text-zinc-200"
          target="_blank"
          to="https://remix.run"
        >
          Remix
        </Link>
      </em>

      <ul className="ml-auto flex items-center gap-4">
        <Link className="group" target="_blank" to="https://github.com/iamwxq">
          <svg
            height="18"
            role="img"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              "fill-zinc-400 transition-all",
              "group-hover:fill-zinc-500 dark:group-hover:fill-zinc-300",
            )}
          >
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </Link>

        <Link className="group" target="_blank" to="https://x.com/whoeverimf5">
          <svg
            height="18"
            role="img"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              "fill-zinc-400 transition-all",
              "group-hover:fill-zinc-500 dark:group-hover:fill-zinc-300",
            )}
          >
            <title>X</title>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
        </Link>

        <Link className="group" to="mailto:whoeverimf5@gmail.com">
          <Mail className="size-5 text-zinc-400 transition-all group-hover:text-zinc-500 dark:group-hover:text-zinc-300" />
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
