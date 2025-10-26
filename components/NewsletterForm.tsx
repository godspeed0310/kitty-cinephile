import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Cat } from "lucide-react";
import Image from "next/image";

const NewsletterForm = () => {
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
          <div className="flex flex-col lg:flex-row items-start flex-1 justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold font-noto-serif-display">
                The Great Cat-sby: Weekly Edition
              </h1>
              <p className="text-muted-foreground text-sm max-w-sm md:max-w-lg lg:max-w-xs xl:max-w-lg wrap-break-word mt-1">
                Subscribe for our digest of the top movie reviews, delivered
                straight to you. It&apos;s the plot twist your inbox needs.
              </p>
            </div>
            <div className="flex flex-col items-stretch md:items-start w-full md:max-w-xs xl:max-w-sm">
              <div className="flex flex-col md:flex-row gap-2 mt-3">
                <InputGroup>
                  <InputGroupInput placeholder="m@meow.com" />
                  <InputGroupAddon>
                    <Cat />
                  </InputGroupAddon>
                </InputGroup>
                <Button className="px-5">Subscribe</Button>
              </div>
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
