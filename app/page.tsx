import { caller } from "@/trpc/server";
import { Route } from "next";
import Link from "next/link";

const Home = async () => {
  const blogs = await caller.blogs.getAll();

  return (
    <main className="flex flex-col gap-5 py-5">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link
            href={`/blog/${blog.id}` as Route}
            className="text-2xl font-bold"
          >
            {blog.title}
          </Link>
          <p className="text-sm text-muted-foreground">{blog.summary}</p>
        </div>
      ))}
    </main>
  );
};

export default Home;
