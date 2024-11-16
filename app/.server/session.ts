import process from "node:process";
import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t_laifu"],
    name: "laifu_theme",
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "laifu.me", secure: true }
      : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
