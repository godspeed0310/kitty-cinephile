import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="h-screen w-full px-5 flex flex-col space-y-4 items-center justify-center text-center">
      <Image src="/notfound.svg" alt="Not Found" width={120} height={120} />
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-xl font-semibold font-noto-serif-display">
        Page Not Found
      </h2>
      <p className="text-muted-foreground text-sm max-w-md">
        Looks like a cat pawsed the connection. We can&apos;t find that one, but
        don&apos;t worry—we&apos;re sending a tiny paw patrol to look for it.
      </p>
      <Link
        href="/"
        replace
        prefetch
        className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;
