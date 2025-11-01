"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

const Error = ({ error, reset }: Props) => {
  return (
    <main className="h-screen w-full px-5 flex flex-col space-y-4 items-center justify-center text-center">
      <Image src="/error.svg" alt="Error" width={120} height={120} />
      <h2 className="text-3xl font-noto-serif-display max-w-md font-bold">
        Cat-tastrophic Error! A Feline Found the Keyboard
      </h2>
      <p className="text-muted-foreground text-sm my-4 max-w-md">
        We apologize. Our chief programmer, a curious kitten, clearly walked
        across the main keys. The damage report is below:{" "}
        <span className="font-bold">{error.message}</span>
      </p>
      <Button onClick={() => reset()}>Try Again</Button>
    </main>
  );
};

export default Error;
