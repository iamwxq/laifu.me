import { Link as _Link } from "@remix-run/react";

interface Props {
  children?: React.ReactNode;
  to: string;
}

function Link({ children, to }: Props) {
  return (
    <_Link
      className="mx-1 text-slate-600 underline dark:text-cyan-500"
      target="_blank"
      to={to}
    >
      {children || to}
    </_Link>
  );
};

export default Link;
