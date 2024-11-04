import { useNavigate } from "@remix-run/react";

interface Props {
  icon: React.ReactNode;
  description: string;
}

function ErrorWrapper({ description, icon }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1">
      <div className="m-auto flex max-w-4xl select-none flex-col items-center justify-center p-6">
        <div className="text-zinc-600 dark:text-zinc-200">
          {icon}
        </div>
        <div className="pt-7 text-xl text-zinc-600 dark:text-zinc-200">
          {description}
        </div>
        <button
          className="mt-14 cursor-pointer self-end text-zinc-400 underline-offset-4 transition-all hover:text-zinc-400 hover:underline dark:hover:text-zinc-300"
          type="button"
          onClick={() => navigate("/", { replace: true })}
        >
          &larr; 返回
        </button>
      </div>
    </div>
  );
};

export default ErrorWrapper;
