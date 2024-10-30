import { Outlet } from "@remix-run/react";

function Blog() {
  return (
    <div className="bg-red-300">
      <Outlet />;
    </div>
  );
};

export default Blog;
