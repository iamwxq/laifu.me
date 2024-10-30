import { useLocation } from "@remix-run/react";

interface Props {
  totalpage: number;
}

function Pagination({ totalpage }: Props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const current = params.get("p");

  return (
    <div>
      <div className="mx-auto flex max-w-4xl items-center justify-between pb-8 pt-6 text-sm text-zinc-500">
        <div></div>
        <em className="select-none not-italic">{current} / {totalpage}</em>
        <div></div>
      </div>
    </div>
  );
};

export default Pagination;
