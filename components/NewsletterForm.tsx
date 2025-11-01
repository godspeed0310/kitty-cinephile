"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Cat } from "lucide-react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const newsletterSchema = z.object({
  email: z.email(),
});
type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterForm = () => {
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const trpc = useTRPC();
  const addSubscription = useMutation(
    trpc.newsletter.addPlatformSubscription.mutationOptions()
  );

  const onSubmit = async (data: NewsletterFormData) => {
    await addSubscription.mutateAsync(data, {
      onError: (error) => {
        toast.error("Unable to add subscription", {
          description: error.message,
        });
      },
      onSuccess: () => {
        toast.success("Added email subscription successfully", {
          description: "Welcome to the Clowder!",
        });
        form.reset();
      },
    });
  };

  return (
    <Card className="newsletter-gradient p-0.5">
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-8 items-center justify-evenly">
          <div className="shrink">
            <Image
              src="/newsletter.svg"
              alt="Newsletter"
              width={120}
              height={120}
            />
          </div>
          <div className="flex flex-col lg:flex-row flex-1 justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold font-noto-serif-display">
                The Great Cat-sby: Weekly Edition
              </h1>
              <p className="text-muted-foreground text-sm max-w-sm md:max-w-lg lg:max-w-xs xl:max-w-lg wrap-break-word mt-1">
                Subscribe for our digest of the top movie reviews, delivered
                straight to you. It&apos;s the plot twist your inbox needs.
              </p>
            </div>
            <div className="flex flex-col w-full md:max-w-sm xl:max-w-sm">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col md:flex-row gap-2 mt-3 w-full max-w-88"
              >
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            placeholder="m@meow.com"
                            disabled={addSubscription.isPending}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            autoComplete="email"
                          />
                          <InputGroupAddon>
                            <Cat />
                          </InputGroupAddon>
                        </InputGroup>
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <Button className="px-5">Subscribe</Button>
              </form>
              <span className="text-muted-foreground text-xs mt-2 max-w-xs">
                Only the best reviews and you can unsubscribe anytime. No spam,
                we promise!
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
};

export default NewsletterForm;
