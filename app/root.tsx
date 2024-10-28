import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "~/tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="relative min-h-full w-full pt-0 xl:pt-8">
      <div className="mx-auto max-w-screen-3xl px-0 xl:px-2 3xl:px-0">
        {/* Header */}
        <header className="mb-0 bg-white px-1 py-1.5 xl:mb-2">
          header
        </header>

        <main className="mb-0 flex xl:mb-2 xl:gap-2">
          <div className="flex-1">
            {/* Menu nativator */}
            <nav className="bg-white px-1 py-1.5">
              <ul className="flex gap-2">
                <li>
                  <Link to="/">首页</Link>
                </li>
                <li>
                  <Link to="/archive">归档</Link>
                </li>
              </ul>
            </nav>

            {/* Article list */}
            <div className="bg-white px-1 py-1.5">
              <Outlet />
            </div>
          </div>

          {/* Profile aside */}
          <aside className="ml-auto bg-white px-1 py-1.5">
            aside
          </aside>
        </main>

        {/* Infomation footer */}
        <footer className="bg-white px-1 py-1.5">
          footer
        </footer>
      </div>

      <button
        className="fixed bottom-4 right-4 size-8 rounded-full bg-blue-400"
        type="button"
      >
      </button>
    </div>
  );
}
