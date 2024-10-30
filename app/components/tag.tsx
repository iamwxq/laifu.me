import type { Tag as TagType } from "~/.server/model";
import { useNavigate } from "@remix-run/react";
import { Tag as TagIcon } from "lucide-react";

interface Props {
  tag: TagType;
}

function Tag({ tag }: Props) {
  const navigate = useNavigate();

  return (
    <button
      className="flex cursor-pointer select-none items-center gap-1 rounded-md px-1.5 py-0.5 transition-all hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
      type="button"
      onClick={() => navigate(`/blog?p=1&t=${tag.id}`)}
    >
      <TagIcon className="size-[14px] rotate-90" />
      <span>{tag.name}</span>
    </button>
  );
};

export default Tag;
