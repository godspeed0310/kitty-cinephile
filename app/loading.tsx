import { Loader2 } from "lucide-react";
import Image from "next/image";

const Loading = () => {
  return (
    <main className="h-screen w-full flex flex-col px-5 space-y-4 items-center justify-center text-center">
      <Image src="/loading.svg" alt="Loading" width={120} height={120} />
      <h1 className="text-xl font-bold font-noto-serif-display">
        Just a moment. Our server is still basking in the sun.
      </h1>
      <Loader2 className="animate-spin" />
      <p className="text-muted-foreground text-sm max-w-md">
        The page will load when the sunbeam hits the right spot. We&apos;re on{" "}
        <strong>cat</strong> time. Thanks for your patience.
      </p>
    </main>
  );
};

export default Loading;
