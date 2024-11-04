import { useNavigate } from "@remix-run/react";
import { Lock } from "lucide-react";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1">
      <div className="m-auto flex max-w-4xl select-none flex-col items-center justify-center p-6">
        <Lock className="size-16 text-zinc-600 dark:text-zinc-200" />
        <div className="pt-7 text-xl text-zinc-600 dark:text-zinc-200">
          你暂时没有权限访问这篇文章哦
        </div>
        <button
          className="mt-14 cursor-pointer self-end text-zinc-400 underline-offset-4 transition-all hover:underline"
          type="button"
          onClick={() => navigate("/", { replace: true })}
        >
          &larr; 返回
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
