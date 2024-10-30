import { themeSessionResolver } from "~/.server/session";
import { createThemeAction } from "remix-themes";

export const action = createThemeAction(themeSessionResolver);
