import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const tag = url.searchParams.get("t");
  return json({ tag });
}

function Blog() {
  const { tag } = useLoaderData<typeof loader>();

  return (
    <div>
      {tag}
    </div>
  );
};

export default Blog;
