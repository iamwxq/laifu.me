import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

export function ModeToggle() {
  const [mode, setMode] = useTheme();

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
    <div>
      <button
        className="flex items-center justify-center px-3 py-1"
        type="button"
        onClick={handleSwitchMode}
      >
        <Sun
          className={clsx(
            "size-5 cursor-pointer select-none text-zinc-200 transition-all",
            "hover:text-zinc-50",
            { hidden: mode === Theme.LIGHT },
          )}
        />

        <Moon
          className={clsx(
            "size-5 cursor-pointer select-none text-zinc-500 transition-all",
            "hover:text-zinc-800",
            { hidden: mode === Theme.DARK },
          )}
        />
      </button>
    </div>
  );
}
