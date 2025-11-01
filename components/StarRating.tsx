import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

type Props = Readonly<{
  rating: number;
  className?: string;
  variant?: "default" | "compact";
}>;

const StarRating = ({ rating, className, variant = "default" }: Props) => {
  const wholeRating = Math.floor(rating);
  const hasHalfStar = rating - wholeRating >= 0.5;
  const totalStars = 5;

  return (
    <div
      className={cn("flex gap-1 items-center mb-2", className)}
      aria-label={`Rating: ${rating} out of 5`}
      role="img"
    >
      {Array.from({ length: totalStars }, (_, index) => {
        if (index < wholeRating) {
          return (
            <Star
              key={index}
              className="fill-yellow-500 stroke-yellow-500"
              aria-hidden="true"
              size={variant === "compact" ? 15 : undefined}
            />
          );
        } else if (hasHalfStar && index === wholeRating) {
          return (
            <StarHalf
              key={index}
              className="fill-yellow-500 stroke-yellow-500"
              aria-hidden="true"
              size={variant === "compact" ? 15 : undefined}
            />
          );
        } else {
          return (
            <Star
              key={index}
              className="text-foreground"
              aria-hidden="true"
              size={variant === "compact" ? 15 : undefined}
            />
          );
        }
      })}
      <p
        className={cn("ml-2 font-semibold", variant === "compact" && "text-sm")}
      >
        ({rating}/5)
      </p>
    </div>
  );
};

export default StarRating;
