import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useHypertune } from "@/hypertune/hypertune.react";
import { cn, getFullName } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Author } from "@/types/Author";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Cat } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Props = Readonly<{
  author: Author;
  className?: string;
}>;

const newsletterSchema = z.object({
  email: z.email(),
});
type NewsletterFormData = z.infer<typeof newsletterSchema>;

const AuthorSubscriptionForm = ({ author, className }: Props) => {
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const trpc = useTRPC();
  const addAuthorSubscription = useMutation(
    trpc.newsletter.addAuthorSubscription.mutationOptions()
  );
  const hypertune = useHypertune();
  const followAuthorEnabled = hypertune.enableNewsletterSignups({
    fallback: true,
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: NewsletterFormData) => {
    startTransition(async () => {
      if (!followAuthorEnabled) {
        toast.error("Following authors is currently disabled.", {
          description: "Please try again later.",
        });
      } else {
        addAuthorSubscription.mutate(
          {
            email: data.email,
            authorId: author.id,
          },
          {
            onError: (error) => {
              toast.error("Unable to follow author", {
                description: error.message,
              });
            },
            onSuccess: () => {
              toast.success("Successfully followed author", {
                description:
                  "You'll be notified of new posts from this author!",
              });
              form.reset();
            },
          }
        );
      }
    });
  };
  const formPending = isPending || addAuthorSubscription.isPending;

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
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full mt-3 flex-1 flex flex-col items-center justify-center">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupAddon>
                      <Cat />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      placeholder="m@meow.com"
                      disabled={formPending}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                  </InputGroup>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button disabled={formPending} className="mt-2 w-full">
            <LoadingSwap isLoading={formPending}>Follow</LoadingSwap>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthorSubscriptionForm;
