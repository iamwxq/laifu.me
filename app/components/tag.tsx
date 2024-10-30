import type { Tag as TagType } from "~/.server/model";
import { NavLink } from "@remix-run/react";
import { Tag as TagIcon } from "lucide-react";

interface Props {
  tag: TagType;
}

function Tag({ tag }: Props) {
  return (
    <NavLink
      className="flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 transition-all hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
      to={`/blog?p=1&t=${tag.id}`}
    >
      <TagIcon className="size-[14px] rotate-90" />
      <span>{tag.name}</span>
    </NavLink>
  );
};

export default Tag;
