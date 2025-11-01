import BrandHeader from "@/components/BrandHeader";
import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

const BlogLayout = ({ children }: Props) => {
  return (
    <main className="space-y-5 p-5 flex flex-col max-w-7xl mx-auto">
      <BrandHeader />
      {children}
    </main>
  );
};

export default BlogLayout;
