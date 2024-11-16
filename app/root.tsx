import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { themeSessionResolver } from "~/.server/session";
import clsx from "clsx";
import { PreventFlashOnWrongTheme, Theme, ThemeProvider, useTheme } from "remix-themes";
import ErrorInternalSystem from "~/errors/internal-system";
import ErrorNotFound from "~/errors/not-found";
import Footer from "~/layouts/footer";
import Header from "~/layouts/header";
import styles from "~/tailwind.css?url";
import { ErrorCode } from "~/types";

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
    href: styles,
  },
  // 引用了 Roboto, Noto Sans SC, Fira Code 字体
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Noto+Sans+SC:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return { theme: (await themeSessionResolver(request)).getTheme() };
}

export function ErrorBoundary() {
  const error = useRouteError();
  const data = useRouteLoaderData<typeof loader>("root");

  return (
    <html className={clsx(data?.theme)} lang="zh-Hans">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <title>Laifu | 来福</title>
      </head>
      <body>
        <div className="relative min-h-screen bg-white selection:bg-zinc-200 dark:bg-black dark:selection:bg-zinc-700">
          <div className="h-[57px]" />

          <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-7xl flex-col px-6">
            {isRouteErrorResponse(error) && error.status === ErrorCode.NotFound && <ErrorNotFound />}
            {!isRouteErrorResponse(error) && <ErrorInternalSystem />}
            <Footer />
          </div>
        </div>

        <Scripts />
      </body>
    </html>
  );
}

export function App() {
  const [theme, setTheme] = useTheme();
  const data = useLoaderData<typeof loader>();

  const isDark = theme === Theme.DARK;

  function handleSwitchTheme() {
    switch (theme) {
      case Theme.DARK:
        setTheme(Theme.LIGHT);
        break;
      case Theme.LIGHT:
        setTheme(Theme.DARK);
        break;
      default:
        setTheme(Theme.LIGHT);
    }
  }

  return (
    <html className={clsx(theme)} lang="zh-Hans">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <title>Laifu | 来福</title>
      </head>

      <body>
        <div className="relative min-h-screen bg-white selection:bg-zinc-200 dark:bg-black dark:selection:bg-zinc-700">
          <Header isDark={isDark} onSwitchTheme={handleSwitchTheme} />

          <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-7xl flex-col px-6">
            <Outlet />
            <Footer />
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppWithProvider() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider
      specifiedTheme={data.theme}
      themeAction="/action/set-theme"
    >
      <App />
    </ThemeProvider>
  );
}

export default AppWithProvider;
