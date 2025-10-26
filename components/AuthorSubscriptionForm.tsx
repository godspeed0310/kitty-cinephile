import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn, getFullName } from "@/lib/utils";
import { Author } from "@/types/Author";
import { Cat } from "lucide-react";

type Props = Readonly<{
  author: Author;
  className?: string;
}>;

const AuthorSubscriptionForm = ({ author, className }: Props) => {
  return (
    <div
      className={cn(
        "my-5 border-y py-5 flex flex-col items-center justify-center",
        className
      )}
    >
      <h1 className="text-lg font-bold font-noto-serif-display text-center wrap-break-word">
        Purr-sonal Updates from {getFullName(author)}
      </h1>
      <p className="text-center text-muted-foreground text-sm md:text-xs mt-1">
        Follow this author to receive updates directly to your inbox!
      </p>
      <div className="w-full mt-3 flex-1 items-center flex flex-col justify-center">
        <InputGroup>
          <InputGroupAddon>
            <Cat />
          </InputGroupAddon>
          <InputGroupInput placeholder="m@meow.com" />
        </InputGroup>
        <Button className="mt-2 w-full">Follow</Button>
      </div>
    </div>
  );
};

export default AuthorSubscriptionForm;
