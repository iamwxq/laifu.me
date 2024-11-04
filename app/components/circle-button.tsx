import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  visible?: boolean;
  behavior: () => void;
}

function CircleButton({ children, visible = true, behavior }: Props) {
  return (
    <div
      className={clsx(
        "flex size-9 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-zinc-400 transition-all hover:bg-zinc-200 hover:text-zinc-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-zinc-300",
        visible || "hidden",
      )}
      onClick={behavior}
    >
      {children}
    </div>
  );
};

export default CircleButton;
