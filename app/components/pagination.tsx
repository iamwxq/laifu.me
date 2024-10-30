import { useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  totalpage: number;
}

function Pagination({ totalpage }: Props) {
  const [params, setParams] = useSearchParams();
  const current = Number(params.get("p"));

  function handleSetPage(inc: 1 | -1) {
    if (inc > 0) {
      if (current >= totalpage) {
        return;
      }
    }
    else {
      if (current <= 1) {
        return;
      }
    }

    setParams((prev) => {
      prev.set("p", `${current + inc}`);
      return prev;
    }, {
      preventScrollReset: true,
      replace: true,
    });
  }

  return (
    <div>
      <div className="mx-auto flex max-w-4xl items-center justify-between pb-8 pt-6 text-sm text-zinc-500">
        <div className={clsx(
          "opacity-0",
          { "opacity-100": current > 1 },
        )}
        >
          <ArrowLeft
            className={clsx(
              "size-9 rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-100 dark:hover:bg-slate-900/70",
              { "cursor-pointer": current > 1 },
            )}
            onClick={() => handleSetPage(-1)}
          />
        </div>

        <em className="select-none not-italic">{current} / {totalpage}</em>

        <div className={clsx(
          "opacity-0",
          { "opacity-100": current < totalpage },
        )}
        >
          <ArrowRight
            className={clsx(
              "size-9 rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-100 dark:hover:bg-slate-900/70",
              { "cursor-pointer": current < totalpage },
            )}
            onClick={() => handleSetPage(1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
