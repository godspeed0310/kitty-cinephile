import { STATIC_DESCRIPTION } from "@/constants/metadata";
import Link from "next/link";

const BrandHeader = () => {
  return (
    <div className="relative w-full h-48 css-grid-pattern-fixed px-5 mt-5 flex flex-col justify-center mb-3">
      <Link href="/">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-fleur-de-leah">
          Kitty Cinephile
        </h1>
        <p className="text-sm pt-3 text-muted-foreground md:w-3/4 wrap-break-word">
          {STATIC_DESCRIPTION}
        </p>
      </Link>
    </div>
  );
};

export default BrandHeader;
