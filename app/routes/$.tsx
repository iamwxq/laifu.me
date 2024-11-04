export async function loader() {
  throw new Response("Not Found", { status: 404 });
}

function NotFound() {
  return null;
};

export default NotFound;
