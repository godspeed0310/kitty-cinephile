import BlogCard from "@/components/BlogCard";
import FeaturedBlog from "@/components/FeaturedBlog";
import { caller } from "@/trpc/server";

export const revalidate = 3600;

const Home = async () => {
  const [featured, ...rest] = await caller.blogs.getAll();

  return (
    <main className="flex flex-col gap-5 pb-5">
      <FeaturedBlog blog={featured} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </main>
  );
};

export default Home;
