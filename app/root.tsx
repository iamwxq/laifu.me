import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { themeSessionResolver } from "~/.server/session";
import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import Footer from "~/layouts/footer";
import Header from "~/layouts/header";
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

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return { theme: getTheme() };
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html className={clsx(theme)} lang="zh-Hans">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <div className="relative min-h-svh bg-white dark:bg-black">
          <Header />

          <div className="mx-auto max-w-7xl">

            <Footer />
          </div>

        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProvider() {
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
